import {useLog} from "../../contexts/LogContext.tsx";
import {ExerciseCard} from "./ExerciseCard.tsx";
import '../../styles/LogPage/Exercises.css'

export const Exercises = ({}) => {

    const {setShowExerciseMenu} = useLog();
    return (
        <section className="exercises">

            <button
                onClick={() => setShowExerciseMenu(false)}
            >Remove</button>


            <ExerciseCard
                title={'Biceps curl'}/>

        </section>
    )
}