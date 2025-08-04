



import {Router} from 'express'
import {authenticateUser} from "../middleware/supabase";
import {createMuscleGroup, deleteCustomMuscleGroup, fetchMuscleGroups} from "../controllers/muscleGroupController";


const muscleGroupRoute = Router()

muscleGroupRoute.get('/fetch', authenticateUser, fetchMuscleGroups);

muscleGroupRoute.post('/create', authenticateUser, createMuscleGroup);

muscleGroupRoute.delete('/delete/:category_id', authenticateUser, deleteCustomMuscleGroup);

export default muscleGroupRoute