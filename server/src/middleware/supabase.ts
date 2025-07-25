import supabase from "../clients/supabaseClient";
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Missing token' });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};