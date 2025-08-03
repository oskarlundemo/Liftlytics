

import '../../styles/ExercisesStyles/Exerice.css'
import {useExerciseContext} from "../../contexts/ExerciseContext.tsx";

export const AddExercise = ({}) => {

    const {setShowCreateMenu} = useExerciseContext();

    return (
        <div onClick={() => setShowCreateMenu(true)} className="add-exercise-icon">
            <span>Add exercise</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </div>
    )
}