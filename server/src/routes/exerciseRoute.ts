



import { Router } from 'express';
import {deleteCustomExercise, fetchCustomExercises, updateCustomExercise} from "../controllers/exercisesController";
import {authenticateUser} from "../middleware/supabase";

const exerciseRoute = Router();


exerciseRoute.get('/custom/fetch', authenticateUser, fetchCustomExercises);

exerciseRoute.delete('/custom/delete/:id', authenticateUser, deleteCustomExercise)

exerciseRoute.post('/custom/update/:id', authenticateUser, updateCustomExercise);


export default exerciseRoute;