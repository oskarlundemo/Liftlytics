import { Request, Response } from 'express';
import {prisma} from "../clients/prismaClient";


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


export const saveWorkout = async (req: Request, res: Response) => {


    try {

        const {
            workoutName,
            startDate,
            endDate,
            startTime,
            endTime,
            bodyWeigth,
            notes,
            exercises
        } = req.body;

        const testUser = await prisma.user.create({
        });


        const newWorkout = await prisma.workout.create({
            data: {
                name: workoutName,
                startTime: startTime,
                endTime: endTime,
                bodyWeight: bodyWeigth,
                notes: notes,
                startDate: startDate,
                endDate: endDate,

                user: {
                    connect: { id: testUser.id}
                }
            }
        })


        console.log(newWorkout);

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