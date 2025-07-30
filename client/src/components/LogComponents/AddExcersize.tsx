import {useLogContext} from "../../contexts/LogContext.tsx";


export const AddExcersize = ({}) => {

    const {setAddExerciseMenu} = useLogContext();

    return (
        <div
            onClick={() => setAddExerciseMenu(true)}
            className={'add-exercise'}>
            <h2>Add exercise</h2>
        </div>
    )
}