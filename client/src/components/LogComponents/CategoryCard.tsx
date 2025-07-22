
import '../../styles/LogPage/CategorySelection.css'
import {useLog} from "../../contexts/LogContext.tsx";

type CategoryProps = {
    title: string,
    exercises: Array<object>,
}

export const CategoryCard = ({title, exercises}:CategoryProps) => {

    const {setShowExerciseMenu, setSelectedExercises, setSelectedMuscleGroupName} = useLog();

    return (
        <div
            onClick={() => {
                setShowExerciseMenu(true);
                setSelectedExercises(exercises);
                setSelectedMuscleGroupName(title);}
            }
            className="category-card">
            <h2>{title}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
        </div>
    )
}