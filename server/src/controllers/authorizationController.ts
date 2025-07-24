
import { Request, Response } from 'express';





export const addUserToDB = (req: Request, res: Response) => {
    try {
        console.log('I rätt route')
    } catch (err) {
        console.error(err);
    }
}