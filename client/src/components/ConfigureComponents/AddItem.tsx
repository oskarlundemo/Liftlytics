import '../../styles/ExercisesStyles/Exerice.css'


type AddExerciseProps = {
    setShowMenu: (showMenu: boolean) => void;
    title: string;
}

export const AddItem = ({setShowMenu, title}:AddExerciseProps) => {

    return (
        <div onClick={() => setShowMenu(true)} className="add-exercise-icon">
            <span>{title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </div>
    )
}