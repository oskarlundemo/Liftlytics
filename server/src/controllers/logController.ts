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

        res.status(statusCode).json({
            success: false,
            message: err.message || 'Internal server error',
            errorCode: err.code || 'UNKNOWN_ERROR',
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }

}