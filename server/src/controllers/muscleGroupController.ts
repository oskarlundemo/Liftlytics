import {AuthenticatedRequest} from "../middleware/supabase";
import {Request, Response} from "express";
import {prisma} from "../clients/prismaClient";


export const fetchMuscleGroups = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const userId = req.user.id;

        if (!userId) {
            res.status(403).json({
                message: "Unauthorized"
            });
        }

        const muscleGroups = await prisma.muscleGroup.findMany({
            where: {
                userId: userId,
                isDefault: false,
            }
        })

        res.status(200).json({
            status: "success",
            message: "Muscle Group API returned successfully",
            data: muscleGroups
        })

    } catch (err:any) {
        console.error(err);
        res.status(500).json({
            message: err.message,
            error: err
        })
    }
}


export const createMuscleGroup = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const muscleGroupName = req.body.muscleGroupName.muscleGroupName;
        const userId = req.user?.id;


        if (!muscleGroupName || muscleGroupName.length > 100) {
            return res.status(400).json({
                message: "Invalid muscle group name"
            });
        }

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: Missing user"
            });
        }

        const newMuscleGroup = await prisma.muscleGroup.create({
            data: {
                userId: userId,
                name: muscleGroupName,
                isDefault: false,
            }
        });

        console.log("Created muscle group:", newMuscleGroup);

        return res.status(201).json({
            status: "success",
            message: "Muscle group created",
            muscleGroup: newMuscleGroup
        });

    } catch (error: any) {
        console.error("Error creating muscle group:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



export const deleteCustomMuscleGroup = async (req: AuthenticatedRequest, res: Response) => {



    try {

        console.log('Deleteing');
        console.log(req.params)

        const userId = req.user.id;
        const muscleGroupId = req.params.category_id;

        if (!muscleGroupId) {
            return res.status(401).json({
                message: "Unauthorized: Missing paramters"
            })
        }


        const isUsersMuscleGroup = await prisma.muscleGroup.findUnique({
            where: {
                id: muscleGroupId,
                isDefault: false,
                userId: userId
            }
        })

        if (!isUsersMuscleGroup) {
            return res.status(401).json({
                message: "Unauthorized action"
            })
        }

        const deletedMuscleGroup = await prisma.muscleGroup.delete({
            where: {
                id: muscleGroupId,
                userId: userId,
                isDefault: false
            }
        })

        res.status(200).json({
            status: "success",
            message: "Muscle group deleted successfully",
            deletedId: deletedMuscleGroup.id
        })

    } catch (error:any) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            error: error
        })
    }

}