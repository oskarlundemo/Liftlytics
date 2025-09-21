
import '../../styles/LogPage/Exercises.css'

type ExerciseModuleHeaderProps = {
    title: string;
}



export const ExerciseModuleHeader = ({title} : ExerciseModuleHeaderProps) => {

    return (
        <div className="exercise-module-header">
            <h3>{title}</h3>
        </div>
    )
}