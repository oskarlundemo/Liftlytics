import {AuthenticatedRequest} from "../middleware/supabase";
import {Request, Response} from "express";
import {prisma} from "../clients/prismaClient";



/**
 * 1. What does the function do?
 *    This functions fetches all the custom muscle groups a user has made
 *
 * 2. What inputs does it expect?
 *    It expects the user to pass their token
 *
 * 3. What outputs or results does it return?
 *    It returns an array with all the custom muscle groups that the user has created
 */


export const fetchCustomMuscleGroups = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const userId = req.user.id; // Parse id from token

        if (!userId) { // If there is no id, return
            res.status(403).json({
                message: "Unauthorized"
            });
        }

        // Find all the custom muscle groups
        const muscleGroups = await prisma.muscleGroup.findMany({
            where: {
                userId: userId,
                isDefault: false,
            }
        })

        // Return muscle groups
        res.status(200).json({
            status: "success",
            message: "Muscle Group API returned successfully",
            data: muscleGroups
        })

    } catch (err:any) {
        // Error, log it
        console.error(err);
        res.status(500).json({
            message: err.message || 'An error occurred while fetching your custom muscle groups',
            error: err
        })
    }
}


/**
 * 1. What does the function do?
 *    This function creates a custom muscle group for the user
 *
 * 2. What inputs does it expect?
 *    It expects the user to pass their token and also the name of the new muscle group to be sent in with the body
 *
 * 3. What outputs or results does it return?
 *    It returns a success or error message
 */

export const createCustomMuscleGroup = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const muscleGroupName = req.body.muscleGroupName.muscleGroupName; // Parse the name
        const userId = req.user?.id; // Get the id

        // If there is no name or the name exceeds 100 chars, return
        if (!muscleGroupName || muscleGroupName.length > 100) {
            return res.status(400).json({
                message: "Invalid muscle group name"
            });
        }

        // If there is no token, return
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: Missing user"
            });
        }

        // Create the new muscle group
        const newMuscleGroup = await prisma.muscleGroup.create({
            data: {
                userId: userId,
                name: muscleGroupName,
                isDefault: false,
            }
        });

        // Successful!
        return res.status(201).json({
            status: "success",
            message: "Muscle group created",
            muscleGroup: newMuscleGroup
        });

    } catch (error: any) {
        // Error, log it
        console.error("Error creating muscle group:", error);
        return res.status(500).json({
            message: error.message || 'An error occurred while creating muscle group',
            error: error.message
        });
    }
};


/**
 * 1. What does the function do?
 *    This function deletes a custom muscle group
 *
 * 2. What inputs does it expect?
 *    The id of the muscle group through the parameters and the token from the user
 *
 * 3. What outputs or results does it return?
 *    It only returns a success or error message with details
 */


export const deleteCustomMuscleGroup = async (req: AuthenticatedRequest, res: Response) => {


    try {

        const userId = req.user.id; // Parse the id
        const muscleGroupId = req.params.category_id; // Get the id of the muscle group

        // If there is no, muscle group id, return
        if (!muscleGroupId) {
            return res.status(401).json({
                message: "Unauthorized: Missing paramters"
            })
        }

        // Check that the muscle group is acutally created by this user
        const isUsersMuscleGroup = await prisma.muscleGroup.findUnique({
            where: {
                id: muscleGroupId,
                isDefault: false,
                userId: userId
            }
        })

        // If it ain't their muscle group, return
        if (!isUsersMuscleGroup) {
            return res.status(401).json({
                message: "Unauthorized action"
            })
        }

        // Delete action
        const deletedMuscleGroup = await prisma.muscleGroup.delete({
            where: {
                id: muscleGroupId,
                userId: userId,
                isDefault: false
            }
        })

        // Successfull!
        res.status(200).json({
            status: "success",
            message: "Muscle group deleted successfully",
            deletedId: deletedMuscleGroup.id
        })

    } catch (error:any) {
        // Error
        console.error(error);
        res.status(500).json({
            message: error.message || 'An error occurred while deleting muscle group',
            error: error
        })
    }
}