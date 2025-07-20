import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'
import {AddExcersize} from "./AddExcersize.tsx";
import {ExerciseSelection} from "./ExerciseSelection.tsx";

export const NewWorkoutPage = () => {

    return (
        <main className="new-workout-container main-box">
            <h1>New Workout</h1>


            <section className={'exercise-selection-container'}>
                <WorkoutData/>

                <ExerciseSelection/>

                <AddExcersize/>
            </section>

        </main>
    )
}