import {AuthenticatedRequest} from "../middleware/supabase";
import { Response } from 'express';
import {prisma} from "../clients/prismaClient";


export const fetchCustomExercises = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const userId = req.user.id;

        const customExercises = await prisma.strengthExercise.findMany({
            where: {
                userId: req.user.id,
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
                            },
                        },
                    },
                },
            },
        });

        res.status(200).json({
            status: 'success',
            message: 'Exercises retrieved successfully',
            customExercises: customExercises
        })
    } catch (err:any) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}