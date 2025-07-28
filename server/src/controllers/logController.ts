import { Request, Response } from 'express';
import {prisma} from "../clients/prismaClient";
import {AuthenticatedRequest} from "../middleware/supabase";

export const fetchCategories = async (req: Request, res: Response) => {

    try {

        const muscleGroups = await prisma.muscleGroup.findMany({
            include: {
                exercises: {
                    include: {
                        exercise: true
                    }
                }
            }
        })

        // Fetch alla som är deafult eller userId == req.user.id

        res.status(200).json({
            muscleGroups,
            message: 'Muscle groups retrieved successfully'
        })

    } catch (err: any) {
        console.error(err);

        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
            errorCode: err.code || 'UNKNOWN_ERROR',
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
}


export const fetchLogs = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const logs = await prisma.workout.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: {
                startTime: 'desc',
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

        res.status(200).json({
            logs,
            message: 'Logs retrieved successfully'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while fetching logs',
          errorCode: 500,
        })
    }
}


export const deleteLog = async (req: AuthenticatedRequest, res: Response) => {

    try {
        console.log('Deleting log');

        const logId = req.params.id;
        const userId = req.user.id;

        if (!logId) {
            res.status(400).json({
                success: false,
                message: 'Invalid log id',
            })
        }

        const isUserWorkout = await prisma.workout.findUnique({
            where: {
                id: logId,
                userId: userId,
            }
        })

        if (!isUserWorkout) {
            res.status(403).json({
                success: false,
                message: 'Unauthorized action',
            })
        }


        await prisma.workout.delete({
            where: {
                id: logId,
                userId: userId,
            }
        })

        res.status(200).json({
            success: true,
            message: 'Deleted log successfully',
        })

    } catch (error: any) {
        console.error(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error while saving workout',
            errorCode: error.code || 'UNKNOWN_ERROR',
        });
    }
}


export const searchForExercises = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const searchQuery = req.query.query;
        const searchTerm = typeof searchQuery === 'string' ? searchQuery : '';

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

        res.status(200).json({
            results: searchResults,
            message: 'Search results successfully',
            success: true,
        })


    } catch (error : any) {
        console.error(error);
        res.status(error.code || 500).json({
            success: false,
            message: 'Internal server error',
            errorCode: 500,
            error: error
        })
    }
}


export const fetchLogById = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const logId = req.params.id;
        console.log('I fetch med ID ' + logId);

        if (!logId) {
            res.status(400).json({
                success: false,
                message: 'Invalid log id',
            })
        }

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

        if (!workout) {
            res.status(404).json({
                success: false,
                message: 'Workout does not exist',
            })
        }

        if (!workout?.userId ! === req.user.id) {
            res.status(403).json({
                success: false,
                message: 'Unauthorized action',
            })
        }

        res.status(200).json({
            workout: workout,
            message: 'Workout successfully retrieved',
        })

    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server while fetching log',
            errorCode: err.code || 'UNKNOWN_ERROR',
        })
    }
}



export const updateWorkout = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const logId = req.params.id;
        const userId = req.user.id;

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


        const deletePreviousExercises = await prisma.workoutExercise.deleteMany({
            where: {
                workoutId: updatedWorkout.id
            }
        })

        await Promise.all(
            exercises.map(async (exercise: any) => {
                const exerciseInWorkout = await prisma.workoutExercise.create({
                    data: {
                        workoutId: updatedWorkout.id,
                        exerciseId: exercise.id,
                    },
                });

                if (exercise.sets.length > 0) {
                    exercise.sets.map(async (eachExercise: any) => {
                        await prisma.workingSetData.create({
                            data: {
                                workoutExerciseId: exerciseInWorkout.id,
                                reps: eachExercise.reps,
                                weight: eachExercise.weight,
                                notes: eachExercise.notes,
                            },
                        });
                    })
                }
            })
        );


        res.status(200).json({
            message: 'Workout successfully updated',
        })


    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server while fetching log',
            errorCode: err.code || 'UNKNOWN_ERROR',
        })
    }

}


export const saveWorkout = async (req: AuthenticatedRequest, res: Response) => {

    try {

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

        console.log(req.body)


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


        await Promise.all(
            exercises.map(async (exercise: any) => {
                const exerciseInWorkout = await prisma.workoutExercise.create({
                    data: {
                        workoutId: newWorkout.id,
                        exerciseId: exercise.id,
                    },
                });

                if (exercise.sets.length > 0) {
                    exercise.sets.map(async (eachExercise: any) => {
                        await prisma.workingSetData.create({
                            data: {
                                workoutExerciseId: exerciseInWorkout.id,
                                reps: eachExercise.reps,
                                weight: eachExercise.weight,
                                notes: eachExercise.notes,
                            },
                        });
                    })
                }
            })
        );

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
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
}