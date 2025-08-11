
import { Request, Response } from 'express';
import {prisma} from "../clients/prismaClient";
import supabase from "../clients/supabaseClient";
import {AuthenticatedRequest} from "../middleware/supabase";

export const syncUserWithDb = async (req: Request, res: Response) => {
    try {
        const { email, id } = req.body;

        if (!id || !email) {
            return res.status(400).json({ error: "Missing id or email in request body" });
        }

        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{ id }, { email }],
            },
        });

        if (userExists) {
            return res.status(200).json({ message: 'User already exists' });
        }

        await prisma.user.create({
            data: { id, email },
        });

        return res.status(201).json({ message: "User was created successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteUserFromDB = async (req: AuthenticatedRequest, res: Response) => {

    try {

        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const { error } = await supabase.auth.admin.deleteUser(userId);

        if (error) {
            console.error("Supabase delete error:", error);
            return res.status(500).json({ error: "Failed to delete user", message: error.message });
        }

        await prisma.user.delete({
            where: {
                id: userId,
            }
        })

        console.log(`User ${userId} deleted from Supabase auth`);
        return res.status(200).json({ message: `User ${userId} deleted` });

    } catch (err:any) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error", message: err.message});
    }
}
