
import {Router} from 'express';
import {
    deleteLog,
    fetchCategories,
    fetchLogById,
    fetchLogs,
    saveWorkout,
    searchForExercises, updateWorkout
} from "../controllers/logController";
import {authenticateUser} from "../middleware/supabase";

const logRoute = Router();

logRoute.delete('/delete/:id', authenticateUser, deleteLog);

logRoute.get('/exercises/categories', fetchCategories);

logRoute.post('/new', authenticateUser, saveWorkout);

logRoute.post('/update/:id', authenticateUser, updateWorkout);

logRoute.get('/fetch', authenticateUser, fetchLogs);

logRoute.get('/fetch/search', authenticateUser, searchForExercises);

logRoute.get('/fetch/log/:id', authenticateUser, fetchLogById);



export default logRoute;