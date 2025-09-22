import { Request, Response } from 'express';
import {prisma} from "../clients/prismaClient";
import supabase from "../clients/supabaseClient";
import {AuthenticatedRequest} from "../middleware/supabase";

/**
 * 1. What does the function do?
 *
 * 2. What inputs does it expect?
 *
 * 3. What outputs or results does it return?
 */


/**
 * 1. This function is used for syncing new users who sign up with OAuth and adding their credentials to the prisma db
 *
 * 2. It expects the id and email of the signed up user to be sent in the body
 *
 * 3. It returns nothing but a success message or eeror if the user already exists
 *
 * 500: Server error
 * 200: User already exists
 * 400: Missing parameters in the body
 * @param req
 * @param res
 */

export const syncUserWithDb = async (req: Request, res: Response) => {

    try {

        const { email, id } = req.body;  // Extract email and id from body

        if (!id || !email) { // If either are missing, fail fast
            return res.status(400).json({ error: "Missing id or email in request body" }); // Return with a message
        }

        // Check if the user already exists in the database
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{ id }, { email }],
            },
        });

        // If they already do, return with a message
        if (userExists) {
            return res.status(200).json({ message: 'User already exists' });
        }

        // User does not exist, insert them into the table
        await prisma.user.create({
            data: { id, email },
        });

        // Return with a success message
        return res.status(201).json({ message: "User was created successfully" });
    } catch (err) {
        console.error(err); // Log the error
        return res.status(500).json({ error: "Internal server error" }); // Return error
    }
};


/**
 * 1. This functions is used when users wants to delete their account from the app
 *
 * 2. It expects the user to pass their token which is extracted in the middleware
 *
 * 3. It returns a success message saying that the user was deleted
 *
 * @param req
 * @param res
 */


export const deleteUserFromDB = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const userId = req.user.id; // Extract id from middleware

        if (!userId) { // If it does not exist, fail fast
            return res.status(400).json({ error: "User ID is required" });
        }

        const { error } = await supabase.auth.admin.deleteUser(userId); // Delete the user from supabase


        if (error) { // If there was an error deleting the user from supabase, log it
            console.error("Supabase delete error:", error);
            return res.status(500).json({ error: "Failed to delete user", message: error.message }); // Show the message to the user
        }

        // If there was no error deleting from supabase, delete them also from the database
        await prisma.user.delete({
            where: {
                id: userId,
            }
        })

        return res.status(200).json({ message: `User ${userId} deleted` }); // Return with a delete message

    } catch (err:any) {
        console.error(err); // Log the error
        return res.status(500).json({ error: "Internal server error", message: err.message}); // Send the error message to the user
    }
}

/**
 * 1. This functions is used when someone wants to log in to the guest account
 *
 * 2. It expects nothing
 *
 * 3. It returns a success message saying that the user logged in and the token associated
 *
 * @param req
 * @param res
 */
