




import { Router} from 'express'
import {authenticateUser} from "../middleware/supabase";
import {
    bestCompounds, bodyWeightData,
    fetchCategories,
    sendWidgetStats,
    weeklyVolumeData,
    workoutStreakData
} from "../controllers/statsController";

const statsRoute = Router();

statsRoute.get('/fetch', authenticateUser, fetchCategories, weeklyVolumeData, workoutStreakData, bestCompounds, bodyWeightData, sendWidgetStats);



export default statsRoute;