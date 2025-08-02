import {AuthenticatedRequest} from "../middleware/supabase";
import { Response } from 'express';
import {prisma} from "../clients/prismaClient";


export const fetchCustomExercises = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const userId = req.user.id;

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
        });

        const allMuscleGroups = await prisma.muscleGroup.findMany()

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


export const deleteCustomExercise = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const exerciseId = req.params.id;
        const userId = req.user.id;

        if (!exerciseId) {
            return res.status(400).json({
                status: 'error',
                message: 'Exercise ID is required.',
            });
        }

        const isUsersExercise = await prisma.strengthExercise.findFirst({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            },
        });

        if (!isUsersExercise) {
            return res.status(403).json({
                status: 'error',
                message: 'Unauthorized action or exercise not found.',
            });
        }

        await prisma.strengthExercise.delete({
            where: {
                id: exerciseId,
            },
        });

        return res.status(200).json({
            status: 'success',
            message: 'Exercise was successfully deleted.',
            deletedId: exerciseId,
        });

    } catch (err:any) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}


export const updateCustomExercise = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const userId = req.user.id;
        const exerciseId = req.params.id;
        const {exercise, categoryId, updatedName} = req.body;

        if (!exerciseId || !exercise || !categoryId || !updatedName) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient paramters.',
            })
        }

        const isUsersExercise = await prisma.strengthExercise.findFirst({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            }
        })

        if (!isUsersExercise) {
            return res.status(403).json({
                status: 'error',
                message: 'Unauthorized action or exercise not found.',
            })
        }

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

        await prisma.exerciseMuscleGroup.deleteMany({
            where: {
                exerciseId: exerciseId,
            },
        });

        await prisma.exerciseMuscleGroup.create({
            data: {
                exerciseId: exerciseId,
                muscleGroupId: categoryId,
            },
        });


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

        console.dir(updatedExercise, { depth: null });

        res.status(200).json({
            status: 'success',
            message: 'Exercise updated successfully',
            updatedExercise: updatedExercise
        })

    } catch (err:any) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }

}