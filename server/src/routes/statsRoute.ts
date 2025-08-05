




import { Router} from 'express'
import {authenticateUser} from "../middleware/supabase";
import {
    bestCompounds, bodyWeightData,
    fetchCategories,
    sendWidgetStats,
    monthlyMuscleVolume,
    workoutStreakData, fetchMuscleVolumeMonth
} from "../controllers/statsController";

const statsRoute = Router();

statsRoute.get('/monthlyVolume', authenticateUser, fetchMuscleVolumeMonth);

statsRoute.get('/fetch', authenticateUser, fetchCategories, monthlyMuscleVolume, workoutStreakData, bestCompounds, bodyWeightData, sendWidgetStats);

export default statsRoute;