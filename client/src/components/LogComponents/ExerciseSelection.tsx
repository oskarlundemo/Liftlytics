import {ExerciseModule} from "./ExerciseModule.tsx";


type ExerciseSelectionProps = {
    setExercises: React.Dispatch<React.SetStateAction<any[]>>
    exercises: Array<object>
};

export const ExerciseSelection = ({exercises, setExercises}: ExerciseSelectionProps) => {

    return (
        <section className={'exercise-selection-wrapper'}>
            {exercises.length > 0 && (
                exercises.map((exercise, index) => (
                    <ExerciseModule
                        title={exercise.exercise.name || 'Undefined'}/>
                ))
            )}
        </section>
    )
}