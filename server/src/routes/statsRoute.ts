




import { Router} from 'express'
import {authenticateUser} from "../middleware/supabase";
import {
    bestCompounds, bodyWeightData,
    fetchCategories,
    sendWidgetStats,
    loadMuscleVolumeMonth,
    workoutStreakData, fetchVolumeMonthSpecific, fetchEntryDetails, averageWorkoutDuration, calendarData
} from "../controllers/statsController";

const statsRoute = Router();

statsRoute.get('/monthlyVolume', authenticateUser, fetchVolumeMonthSpecific);

statsRoute.get('/fetch', authenticateUser, fetchCategories, loadMuscleVolumeMonth, workoutStreakData, calendarData, averageWorkoutDuration, bestCompounds, bodyWeightData, sendWidgetStats);

statsRoute.get('/entry/:exerciseName/:exerciseId', authenticateUser, fetchEntryDetails);

export default statsRoute;