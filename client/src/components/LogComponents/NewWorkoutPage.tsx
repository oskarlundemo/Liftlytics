import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'
import {AddExcersize} from "./AddExcersize.tsx";
import {ExerciseSelection} from "./ExerciseSelection.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {Overlay} from "../MiscComponents/Overlay.tsx";
import {useEffect, useState} from "react";

type NewWorkoutProps = {
    setExercises: React.Dispatch<React.SetStateAction<any[]>>
};


export const NewWorkoutPage = ({} : NewWorkoutProps) => {

    const {showAddExerciseMenu, setShowExerciseMenu, setAddExerciseMenu} = useLog();
    const [exercises, setExercises] = useState<any>([]);

    useEffect(() => {
        console.log(exercises);
    }, [exercises]);

    return (
        <main className="new-workout-container main-box">
            <h1>New Workout</h1>

            <section className={'exercise-selection-container'}>

                <WorkoutData
                    setExercises={setExercises}
                />

                {exercises && (
                    <ExerciseSelection
                        exercises={exercises}
                        setExercises={setExercises}
                    />
                )}

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