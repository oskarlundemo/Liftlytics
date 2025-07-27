
import {Router} from 'express';
import {deleteLog, fetchCategories, fetchLogs, saveWorkout, searchForExercises} from "../controllers/logController";
import {authenticateUser} from "../middleware/supabase";

const logRoute = Router();

logRoute.delete('/delete/:id', authenticateUser, deleteLog);

logRoute.get('/exercises/categories', fetchCategories);

logRoute.post('/new', authenticateUser, saveWorkout);

logRoute.get('/fetch', authenticateUser, fetchLogs);

logRoute.get('/fetch/search', authenticateUser, searchForExercises);



export default logRoute;