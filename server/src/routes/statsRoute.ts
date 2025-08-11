




import { Router} from 'express'
import {authenticateUser} from "../middleware/supabase";
import {
    bestCompounds, bodyWeightData,
    fetchCategories,
    sendWidgetStats,
    loadMuscleVolumeMonth,
    workoutStreakData, fetchMuscleVolumeMonth, fetchEntryDetails, averageWorkoutDuration, checkedCalenderData
} from "../controllers/statsController";

const statsRoute = Router();

statsRoute.get('/monthlyVolume', authenticateUser, fetchMuscleVolumeMonth);

statsRoute.get('/fetch', authenticateUser, fetchCategories, loadMuscleVolumeMonth, workoutStreakData, checkedCalenderData, averageWorkoutDuration, bestCompounds, bodyWeightData, sendWidgetStats);

statsRoute.get('/entry/:exerciseName/:exerciseId', authenticateUser, fetchEntryDetails);

export default statsRoute;