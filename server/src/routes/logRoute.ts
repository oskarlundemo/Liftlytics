
import {Router} from 'express';
import {deleteLog, fetchCategories, fetchLogs, saveWorkout} from "../controllers/logController";
import {authenticateUser} from "../middleware/supabase";

const logRoute = Router();

logRoute.delete('/delete/:id', authenticateUser, deleteLog);

logRoute.get('/exercises/categories', fetchCategories);

logRoute.post('/new', authenticateUser, saveWorkout);

logRoute.get('/fetch', authenticateUser, fetchLogs);



export default logRoute;