import { Request, Response } from 'express';
import {prisma} from "../clients/prismaClient";
import {AuthenticatedRequest} from "../middleware/supabase";
import { format, toZonedTime } from 'date-fns-tz';


/**
 * 1. What does the function do?
 *
 * 2. What inputs does it expect?
 *
 * 3. What outputs or results does it return?
 */


/**
 * 1. This function updates the order that a user has set for their exercise
 *
 * 2. It expects token, an array of all the exercises and the id of the workout
 *
 * 3. It returns a success or error message
 *
 * @param req
 * @param res
 */

export const updateExerciseOrder = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const userId = req.user.id; // Token
        const exercises = req.body; // Get the exercises from the body
        const logId = req.params.id; // Get the id of the log


        // If any input is missing return
        if (!exercises || !logId) {
            return res.status(400).json({
                error: 'Invalid parameters',
            })
        }

        // Make sure that it is the users workout
        const isUsersWorkout = await prisma.workout.findUnique({
            where: {
                id: logId,
                userId: userId,
            }
        })

        // If not users workout they are changing, return
        if (!isUsersWorkout) {
            return res.status(400).json({
                error: 'Unauthorized action',
            })
        }

        // Start a transaction so either all succeed or fail
        await prisma.$transaction(async (tx) => {

            // Delete all the old records
            await tx.workoutExercise.deleteMany({
                where: {
                    workoutId: isUsersWorkout.id,
                },
            });

            // For each exercise in the array of exercises
            for (const exercise of exercises) {

                // Check that it exists
                const existingExercise = await prisma.strengthExercise.findUnique({
                    where: { id: exercise.id },
                });

                // If the exericse does not exist, return
                if (!existingExercise) {
                    throw new Error(`Exercise with id ${exercise.id} does not exist`);
                }

                // Add the exercise to the workout
                const exerciseInWorkout = await tx.workoutExercise.create({
                    data: {
                        workoutId: isUsersWorkout.id,
                        exerciseId: exercise.id,
                    },
                });

                // For each set of the exercise, add it
                for (const eachSet of exercise.sets || []) {
                    await tx.workingSetData.create({
                        data: {
                            workoutExerciseId: exerciseInWorkout.id,
                            reps: eachSet.reps,
                            weight: eachSet.weight,
                            notes: eachSet.notes,
                        },
                    });
                }
            }
        });

        // Exercise was successfully updated
        res.status(200).json({
            message: 'Successfully updated exercise order',
        })


    } catch (err:any) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server while updating exercise order ',
            errorCode: err.code,
        });
    }

}


/**
 * 1. This function returns all the musclegroups that the user has created or are default
 *
 * 2. The token from the user
 *
 * 3. Returns an array containg all the muscle groups that are either default or created by the user
 */


export const fetchMuscleGroups = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const userId = req.user.id; // Token

        // Fetch all the muscle groups that are either default or created by the user
        const muscleGroups = await prisma.muscleGroup.findMany({
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                    where: {
                        exercise: {
                            OR: [
                                { isDefault: true },
                                { userId: userId }
                            ]
                        }
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        // Return all the muscle groups
        res.status(200).json({
            muscleGroups,
            message: 'Muscle groups retrieved successfully'
        })

    } catch (err: any) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error while fetching muscle groups',
            errorCode: err.code || 'UNKNOWN_ERROR',
        });
    }
}


/**
 * 1. What does the function do?
 *    This function returns all the exercise logs that the user has created
 *
 * 2. What inputs does it expect?
 *    It expects the user to provide their token
 *
 * 3. What outputs or results does it return?
 *    An array containing all the logs (objects)
 */



export const fetchLogs = async (req: AuthenticatedRequest, res: Response) => {

    try {

        // Find all the logs matching the user id
        const logs = await prisma.workout.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: {
                startDate: 'desc', // Sort them descending
            },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                        metrics: true,
                    },
                },
            },
        });

        // Adjust timezone
        const timeZone = 'Europe/Stockholm';

        // Group them by month
        const groupedByMonth = Object.groupBy(logs, item => {
            const localDate = toZonedTime(item.startDate, timeZone);
            return format(localDate, 'yyyy-MM');
        });

        const sortedGroupedByMonthEntries = Object.entries(groupedByMonth).sort(
            ([a], [b]) => new Date(b + '-01').getTime() - new Date(a + '-01').getTime()
        );

        const sortedGroupedByMonth = Object.fromEntries(sortedGroupedByMonthEntries);

        // Success, send data to front end
        res.status(200).json({
            logs,
            message: 'Logs retrieved successfully',
            sortedGroupedByMonth,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while fetching logs',
          errorCode: 500,
        })
    }
}


/**
 * 1. What does the function do?
 *    This function deletes exercise logs
 *
 * 2. What inputs does it expect?
 *    The id of the log and the token from the user
 *
 * 3. What outputs or results does it return?
 *    Just a success or error message
 */



export const deleteLog = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const logId = req.params.id; // Id of the log
        const userId = req.user.id;  // Id of the user

        // If log id is missing, fail fast
        if (!logId) {
            res.status(400).json({
                success: false,
                message: 'Invalid log id',
            })
        }

        // Make sure the exercise is the users
        const isUserWorkout = await prisma.workout.findUnique({
            where: {
                id: logId,
                userId: userId,
            }
        })

        // If it aint their workout, return
        if (!isUserWorkout) {
            res.status(403).json({
                success: false,
                message: 'Unauthorized action',
            })
        }

        // Delete the workout
        await prisma.workout.delete({
            where: {
                id: logId,
                userId: userId,
            }
        })

        // Successful deletion
        res.status(200).json({
            success: true,
            message: 'Deleted log successfully',
        })

    } catch (error: any) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error while deleting workout',
            errorCode: error.code || 'UNKNOWN_ERROR',
        });
    }
}



/**
 * 1. What does the function do?
 *    This function filters and searches for exercises that matches the users search query
 *
 * 2. What inputs does it expect?
 *    It expects the search query to be passed in through the request object
 *
 * 3. What outputs or results does it return?
 *    An array with the matching search results (exercises [objects])
 */




export const searchForExercises = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const searchQuery = req.query.query; // Extract the search query
        const searchTerm = typeof searchQuery === 'string' ? searchQuery : '';

        // If the search query is missing, fail fast
        if (!searchQuery) {
            res.status(400).json({
                success: false,
                message: 'Search query required',
            })
        }

        // Fetch the exercises that matches the term
        const searchResults = await prisma.strengthExercise.findMany({
            where: {
                OR: [
                    { userId: req.user.id },
                    { isDefault: true },
                ],
                name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
        });

        // Return the results
        res.status(200).json({
            results: searchResults,
            message: 'Search results successfully',
            success: true,
        })


    } catch (error : any) {
        console.error(error); // Log it
        res.status(error.code || 500).json({
            success: false,
            message: error.message || 'Internal server error while filtering search',
            error: error
        })
    }
}




/**
 * 1. What does the function do?
 *    This function fetches a specific log by id
 *
 * 2. What inputs does it expect?
 *    The id of the log to be fetched
 *
 * 3. What outputs or results does it return?
 *    An object of the log
 */



export const fetchLogById = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const logId = req.params.id; // Extract the id from the params

        // If it is missing, fail fast
        if (!logId) {
            res.status(400).json({
                success: false,
                message: 'Invalid log id',
            })
        }

        // Find the workout we are searching for
        const workout = await prisma.workout.findUnique({
            where: {
                id: logId,
                userId: req.user.id,
            }, include: {
                exercises: {
                    include: {
                        exercise: true,
                        metrics: true
                    }
                },
            }
        })

        // If the workout does not exist, return
        if (!workout) {
            res.status(404).json({
                success: false,
                message: 'Workout does not exist',
            })
        }

        // If the creator the workout is not the user, return
        if (!workout?.userId ! === req.user.id) {
            res.status(403).json({
                success: false,
                message: 'Unauthorized action',
            })
        }

        // Return the workout
        res.status(200).json({
            workout: workout,
            message: 'Workout successfully retrieved',
        })

    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server while fetching log',
            errorCode: err.code || 'UNKNOWN_ERROR',
        })
    }
}




/**
 * 1. What does the function do?
 *    This function updates an old workout
 *
 * 2. What inputs does it expect?
 *    It expects the id of the exercise, token from the user and all the data relateded to the workout
 *
 * 3. What outputs or results does it return?
 *    Just a success or error message
 */


export const updateWorkout = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const logId = req.params.id; // Id of the log
        const userId = req.user.id; // Id of the user

        // If their is no log id return
        if (!logId) {
            res.status(400).json({
                success: false,
                message: 'Invalid log id',
            })
        }

        // Extract all the data
        const {
            workoutName,
            startTime,
            startDate,
            endDate,
            endTime,
            bodyWeight,
            notes,
            exercises
        } = req.body;

        // Make sure that the notes don't exceed 1000 chars
        if (notes.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Notes exceed allowed length'
            });
        }

        // Make sure the name does not exceed 100 chars
        if (workoutName.length > 100) {
            return res.status(400).json({
                success: false,
                message: 'Name of workout exceed allowed length'
            });
        }

        // Update the workout
        const updatedWorkout = await prisma.workout.update({
            data: {
                name: workoutName,
                startTime: startTime,
                endDate: endDate,
                startDate: startDate,
                endTime: endTime,
                bodyWeight: bodyWeight,
                notes: notes,

                user: {
                    connect: { id: req.user?.id },
                },
            },
            where: {
                id: logId,
                userId: userId,
            },
        });


        // Start a transaction to also update all the new exercises, but first delete the old ones, either all succeed or fail
        await prisma.$transaction(async (tx) => {

            // Delete all the exercises related to this workout
            await tx.workoutExercise.deleteMany({
                where: {
                    workoutId: updatedWorkout.id,
                },
            });

            // For each exercise
            for (const exercise of exercises) {

                // Check if it exists
                const existingExercise = await prisma.strengthExercise.findUnique({
                    where: { id: exercise.id },
                });

                // If it does not, throw an error
                if (!existingExercise) {
                    throw new Error(`Exercise with id ${exercise.id} does not exist`);
                }

                // Create a new record of this exercise in this workout
                const exerciseInWorkout = await tx.workoutExercise.create({
                    data: {
                        workoutId: updatedWorkout.id,
                        exerciseId: exercise.id,
                    },
                });

                // For each set, create a record for that exercise
                for (const eachSet of exercise.sets || []) {
                    await tx.workingSetData.create({
                        data: {
                            workoutExerciseId: exerciseInWorkout.id,
                            reps: eachSet.reps,
                            weight: eachSet.weight,
                            notes: eachSet.notes,
                        },
                    });
                }
            }
        });

        // Return a message
        res.status(200).json({
            message: 'Workout successfully updated',
        })


    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Internal server while updating exercise',
            errorCode: err.code || 'UNKNOWN_ERROR',
        })
    }
}

/**
 * 1. What does the function do?
 *    It creates a new custom exercises by the user
 *
 * 2. What inputs does it expect?
 *    It expects the id of the muscle group, name of the exercise and the token of the user
 *
 * 3. What outputs or results does it return?
 *    It returns an object containing the new exercise and a success message
 */


export const createCustomExercise = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const muscleGroupId = req.body.musclegroup.id; // Extract the id
        const exerciseName = req.body.name; // Extract the name
        const userId = req.user.id; // Extract the users id

        // If there is no muscle group id, return
        if (!muscleGroupId) {
            res.status(400).json({
                success: false,
                message: 'Invalid muscle group',
            })
        }

        // If a name is missing, return
        if (!exerciseName) {
            res.status(400).json({
                success: false,
                message: 'Invalid exercise name',
            })
        }

        // Start a transaction and return the results
        const {customExercise, exerciseMuscleGroup } = await prisma.$transaction(async (tx) => {
            // Create the new exercise
            const customExercise = await tx.strengthExercise.create({
                data: {
                    name: exerciseName,
                    category: muscleGroupId,
                    isDefault: false,
                    userId: userId,
                },
            });

            // Link the exercise to a muscle group
            const exerciseMuscleGroup = await tx.exerciseMuscleGroup.create({
                data: {
                    exerciseId: customExercise.id,
                    muscleGroupId: muscleGroupId,
                },
            });

            // Return theese new records
            return { customExercise, exerciseMuscleGroup };
        });


        // Return the object and a message
        res.status(200).json({
            message: 'Custom exercise created',
            exercise: {
                id: exerciseMuscleGroup.id,
                exerciseId: customExercise.id,
                muscleGroupId: muscleGroupId,
                exercise: {
                    id: customExercise.id,
                    name: customExercise.name,
                    isDefault: customExercise.isDefault,
                    userId: customExercise.userId,
                    category: muscleGroupId,
                },
            },
        });


    } catch (err: any) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error while creating custom exercise',
            errorCode: err.code || 'UNKNOWN_ERROR',
        });
    }
}


/**
 * 1. What does the function do?
 *    Saves a new workout from the user
 *
 * 2. What inputs does it expect?
 *    Data of the exercise from the request body and the token from the user
 *
 * 3. What outputs or results does it return?
 *    Just a success or error message
 */


export const saveWorkout = async (req: AuthenticatedRequest, res: Response) => {

    try {

        // Extract all the data for the new exercise
        const {
            workoutName,
            startTime,
            startDate,
            endDate,
            endTime,
            bodyWeight,
            notes,
            exercises
        } = req.body;


        // If the notes are longer than 1000 chars, return
        if (notes.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Notes exceed allowed length'
            });
        }

        // If the name is longer than 100 chars, return
        if (workoutName > 100) {
            return res.status(400).json({
                success: false,
                message: 'Name exceed allowed length'
            });
        }

        // Create a new workout with the passed data
        const newWorkout = await prisma.workout.create({
            data: {
                name: workoutName,
                startTime: startTime,
                endDate: endDate,
                startDate: startDate,
                endTime: endTime,
                bodyWeight: bodyWeight,
                notes: notes,
                user: {
                    connect: { id: req.user?.id },
                }
            }
        })

        // Start a transactions
        await prisma.$transaction(async (tx) => {

            // For each exercise in the list of exercises
            for (const exercise of exercises) {

                // Make sure the exercise exists
                const existingExercise = await prisma.strengthExercise.findUnique({
                    where: { id: exercise.id },
                });

                // If it does not, then return
                if (!existingExercise) {
                    throw new Error(`Exercise with id ${exercise.id} does not exist`);
                }

                // Create a new record of that exercise in this workout
                const exerciseInWorkout = await tx.workoutExercise.create({
                    data: {
                        workoutId: newWorkout.id,
                        exerciseId: exercise.id,
                    },
                });

                // For each set of that exercise, create a new record of it
                for (const eachSet of exercise.sets || []) {
                    await tx.workingSetData.create({
                        data: {
                            workoutExerciseId: exerciseInWorkout.id,
                            reps: eachSet.reps,
                            weight: eachSet.weight,
                            notes: eachSet.notes,
                        },
                    });
                }
            }
        });

        // Return a success message
        res.status(200).json({
            success: true,
            message: 'Workout saved successfully'
        })

    } catch (err: any) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error while saving workout',
            errorCode: err.code || 'UNKNOWN_ERROR',
        });
    }
}