import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'

export const NewWorkoutPage = () => {

    return (
        <main className="new-workout-container main-box">
            <h1>New Workout</h1>

            <WorkoutData/>

        </main>
    )
}