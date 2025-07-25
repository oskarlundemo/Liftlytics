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

        res.status(200).json({
            muscleGroups,
            message: 'Muscle groups retrieved successfully'
        })

    } catch (err: any) {
        console.error(err);
        console.error('[Fetch Categories Error]', err);

        const statusCode = err.statusCode || 500;

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
                userId: req.user.id
            }
        })

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


export const saveWorkout = async (req: AuthenticatedRequest, res: Response) => {

    try {

        console.log(req.user);

        const {
            workoutName,
            startTime,
            endTime,
            bodyWeigth,
            notes,
            exercises
        } = req.body;


        const newWorkout = await prisma.workout.create({
            data: {
                name: workoutName,
                startTime: startTime,
                endTime: endTime,
                bodyWeight: bodyWeigth,
                notes: notes,
                user: {
                    connect: { id: req.user?.id },
                }
            }
        })



        res.status(200).json({
            success: true,
            message: 'Workout saved successfully'
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