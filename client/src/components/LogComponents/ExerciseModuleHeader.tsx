
import '../../styles/LogPage/Exercises.css'

type ExerciseModuleHeaderProps = {
    title: string;
    deleteExercise: (exerciseId: string) => void;
    localId: string;
}



export const ExerciseModuleHeader = ({title, localId, deleteExercise} : ExerciseModuleHeaderProps) => {

    return (
        <div className="exercise-module-header">
            <h3>{title}</h3>
        </div>
    )
}