



import {Router} from 'express'
import {authenticateUser} from "../middleware/supabase";
import {createCustomMuscleGroup, deleteCustomMuscleGroup, fetchCustomMuscleGroups} from "../controllers/muscleGroupController";


const muscleGroupRoute = Router()

muscleGroupRoute.get('/fetch', authenticateUser, fetchCustomMuscleGroups);

muscleGroupRoute.post('/create', authenticateUser, createCustomMuscleGroup);

muscleGroupRoute.delete('/delete/:category_id', authenticateUser, deleteCustomMuscleGroup);

export default muscleGroupRoute