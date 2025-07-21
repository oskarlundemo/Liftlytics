import {useLog} from "../../contexts/LogContext.tsx";


export const AddExcersize = ({}) => {

    const {setAddExerciseMenu} = useLog();

    return (
        <div
            onClick={() => setAddExerciseMenu(true)}
            className={'add-exercise'}>
            <h2>Add exercise</h2>
        </div>
    )
}