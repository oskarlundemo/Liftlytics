import {AuthenticatedRequest} from "../middleware/supabase";
import { Response } from 'express';
import {prisma} from "../clients/prismaClient";

/**
 * 1. What does the function do?
 *
 * 2. What inputs does it expect?
 *
 * 3. What outputs or results does it return?
 */


/**
 * 1. This functions is used for loading the users custom exercises that they have created
 *
 * 2. It expects the users token to be passed in by the middleware
 *
 * 3. It returns an object containing all the custom exercises and muscle groups
 *
 * @param req
 * @param res
 */

export const fetchCustomExercises = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const userId = req.user.id; // Get the id from the token

        // Find all the exercises that the user has created
        const customExercises = await prisma.strengthExercise.findMany({
            where: {
                userId: userId,
                isDefault: false,
            },
            select: {
                id: true,
                name: true,
                muscleGroups: {
                    select: {
                        muscleGroup: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                name: 'asc'
            }
        });


        // Get all the muscle groups that the user has created or are default
        const allMuscleGroups = await prisma.muscleGroup.findMany({
            where: {
                OR: [
                    { userId: userId },
                    { isDefault: true }
                ]
            }
        })


        // Send all the data to the front-end
        res.status(200).json({
            status: 'success',
            message: 'Exercises retrieved successfully',
            customExercises: customExercises,
            allMuscleGroup: allMuscleGroups
        })
    } catch (err:any) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}



/**
 * 1. This function deleted custom exercises createde by a user
 *
 * 2. It expects the user to send their token through the middleware and the id of the exercise in the params
 *
 * 3. It returns a success or error message
 *
 * 200: Successful deletion
 * 500: A server error ocurred
 *
 * @param req
 * @param res
 */


export const deleteCustomExercise = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const exerciseId = req.params.id; // Get the id of the exercise from the params
        const userId = req.user.id; // Get the id of the user from the token


        // If there is no exercise id, fail fast
        if (!exerciseId) {
            return res.status(400).json({
                status: 'error',
                message: 'Exercise ID is required.',
            });
        }

        // Double chekc so the exercise that is going to be deleted is actually the users exercise
        const isUsersExercise = await prisma.strengthExercise.findFirst({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            },
        });

        // If not, return an error
        if (!isUsersExercise) {
            return res.status(403).json({
                status: 'error',
                message: 'Unauthorized action or exercise not found.',
            });
        }

        // Is users exercise, delete
        await prisma.strengthExercise.delete({
            where: {
                id: exerciseId,
            },
        });

        // Return a success message
        return res.status(200).json({
            status: 'success',
            message: 'Exercise was successfully deleted.',
            deletedId: exerciseId,
        });

    } catch (err:any) {
        // Error, log it and send respons to front-end
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}


/**
 * 1. This function updates custom exercises
 *
 * 2. The token from the user and the id of the exercise from the param
 *
 * 3. It returns a success message and the newly updates exercise as an object to be shown in the front-end
 *
 * @param req
 * @param res
 */


export const updateCustomExercise = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const userId = req.user.id; // Get token from middleware
        const exerciseId = req.params.id; // Get id from the params
        const {exercise, categoryId, updatedName} = req.body; // Get the category, name and old exercis data

        // If any of theese are missing, fail fast
        if (!exerciseId || !exercise || !categoryId || !updatedName) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient paramters.',
            })
        }

        // Make sure that this is the users exercise
        const isUsersExercise = await prisma.strengthExercise.findFirst({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            }
        })

        // If a user tries somehow changing someelses exercise, retunr
        if (!isUsersExercise) {
            return res.status(403).json({
                status: 'error',
                message: 'Unauthorized action or exercise not found.',
            })
        }

        // Update the exercise
        await prisma.strengthExercise.update({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            },
            data: {
                name: updatedName,
                category: categoryId,
            }
        })

        // Delete the old records
        await prisma.exerciseMuscleGroup.deleteMany({
            where: {
                exerciseId: exerciseId,
            },
        });

        // Create a new exercise
        await prisma.exerciseMuscleGroup.create({
            data: {
                exerciseId: exerciseId,
                muscleGroupId: categoryId,
            },
        });

        // Gather the data for the new exercise
        const updatedExercise = await prisma.strengthExercise.findFirst({
            where: {
                userId: userId,
                isDefault: false,
                id: exerciseId,
            },
            select: {
                id: true,
                name: true,
                muscleGroups: {
                    select: {
                        muscleGroup: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });

        // Return to the front end
        res.status(200).json({
            status: 'success',
            message: 'Exercise updated successfully',
            updatedExercise: updatedExercise
        })

    } catch (err:any) {
        // Log an error if it occurs
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }

}

/**
 * 1. This function creates a new custom exercise
 *
 * 2. The users token and the id and name of the exercise through the req.body
 *
 * 3. Returns a new object containing data about the new exercise
 *
 * @param req
 * @param res
 */

export const createCustomExercise = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const userId = req.user.id; // User id from token
        const {categoryId, exerciseName} = req.body; // Extract from body

        // If any are missing, fail fast
        if (!exerciseName || !categoryId) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient paramters.',
            })
        }

        // Create the new exercise
        const newExercise = await prisma.strengthExercise.create({
            data: {
                userId: userId,
                category: categoryId,
                name: exerciseName,
                isDefault: false,
            }
        })


        // Create a new insert with the category id
        const newMuscleGroup = await prisma.exerciseMuscleGroup.create({
            data: {
                exerciseId: newExercise.id,
                muscleGroupId: categoryId,
            }
        })

        // Extract the data
        const formattedExercise = await prisma.strengthExercise.findFirst({
            where: {
                id: newExercise.id
            },
            select: {
                id: true,
                name: true,
                muscleGroups: {
                    select: {
                        muscleGroup: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });


        // Send it to the front-end
        res.status(201).json({
            status: 'success',
            message: 'Exercise created',
            newExercise: formattedExercise, // Object containing the new exercise
        })

    } catch (err:any) {
        console.error(err); // Log error
        res.status(500).json({ // Send to the front-end
            status: 'error',
            message: err.message,
        })
    }
}