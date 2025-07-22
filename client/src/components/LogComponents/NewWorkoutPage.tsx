import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'
import {AddExcersize} from "./AddExcersize.tsx";
import {ExerciseSelection} from "./ExerciseSelection.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {Overlay} from "../MiscComponents/Overlay.tsx";

export const NewWorkoutPage = () => {

    const {showAddExerciseMenu, setShowExerciseMenu, setAddExerciseMenu} = useLog();


    return (
        <main className="new-workout-container main-box">
            <h1>New Workout</h1>


            <section className={'exercise-selection-container'}>
                <WorkoutData/>

                <ExerciseSelection/>

                <AddExcersize/>

            </section>


            <Overlay
                showOverlay={showAddExerciseMenu}
                setShowOverlay={() => {
                    setAddExerciseMenu(false);
                    setShowExerciseMenu(false);
                }}
            />

        </main>
    )
}