
import '../../styles/LogPage/CategorySelection.css'
import {useLogContext} from "../../contexts/LogContext.tsx";

type CategoryProps = {
    title: string,
    exercises: Array<object>,
    muscleGroup: object
}

export const CategoryCard = ({title, exercises, muscleGroup}:CategoryProps) => {

    const {setShowExerciseMenu, setSelectedExercises, setSelectedMuscleGroup} = useLogContext();

    return (
        <div
            onClick={() => {
                setSelectedMuscleGroup(muscleGroup);
                setShowExerciseMenu(true);
                setSelectedExercises(exercises);
                }
            }
            className="category-card">
            <h3>{title}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
        </div>
    )
}