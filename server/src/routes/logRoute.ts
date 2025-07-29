
import {Router} from 'express';
import {
    createCustomExercise,
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

logRoute.post('/create/custom-exercise', authenticateUser, createCustomExercise);

logRoute.get('/exercises/categories', authenticateUser, fetchCategories);

logRoute.post('/new', authenticateUser, saveWorkout);

logRoute.post('/update/:id', authenticateUser, updateWorkout);

logRoute.get('/fetch', authenticateUser, fetchLogs);

logRoute.get('/fetch/search', authenticateUser, searchForExercises);

logRoute.get('/fetch/log/:id', authenticateUser, fetchLogById);



export default logRoute;