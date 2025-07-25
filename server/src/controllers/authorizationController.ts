
import { Request, Response } from 'express';
import {prisma} from "../clients/prismaClient";

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
