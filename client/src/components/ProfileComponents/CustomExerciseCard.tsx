import {useExerciseContext} from "../../contexts/ExerciseContext.tsx";


type CustomExerciseProps = {
    name: string
    exercise: object
}


export const CustomExerciseCard = ({name, exercise}:CustomExerciseProps) => {

    const {setSelectedExercise, setShowMenu} = useExerciseContext();

    return (
        <div onClick={() => {setSelectedExercise(exercise); setShowMenu(true)}} className="custom-exercise-card m-4">
            <h2 className={'text-2xl font-bold'}>{name}</h2>
        </div>
    )
}