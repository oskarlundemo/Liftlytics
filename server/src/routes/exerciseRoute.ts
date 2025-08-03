



import { Router } from 'express';
import {deleteCustomExercise, fetchCustomExercises, updateCustomExercise, createCustomExercise} from "../controllers/exercisesController";
import {authenticateUser} from "../middleware/supabase";


const exerciseRoute = Router();


exerciseRoute.get('/custom/fetch', authenticateUser, fetchCustomExercises);

exerciseRoute.delete('/custom/delete/:id', authenticateUser, deleteCustomExercise)

exerciseRoute.post('/custom/update/:id', authenticateUser, updateCustomExercise);

exerciseRoute.post('/custom/create', authenticateUser, createCustomExercise);


export default exerciseRoute;