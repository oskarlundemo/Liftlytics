
import {Router} from 'express';
import {fetchCategories, fetchLogs, saveWorkout} from "../controllers/logController";
import {authenticateUser} from "../middleware/supabase";

const logRoute = Router();

logRoute.get('/', fetchCategories);

logRoute.post('/new', authenticateUser, saveWorkout);

logRoute.get('/fetch', authenticateUser, fetchLogs);

export default logRoute;