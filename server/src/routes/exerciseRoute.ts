



import { Router } from 'express';
import {fetchCustomExercises} from "../controllers/exercisesController";
import {authenticateUser} from "../middleware/supabase";

const exerciseRoute = Router();


exerciseRoute.get('/custom/fetch', authenticateUser, fetchCustomExercises);


export default exerciseRoute;