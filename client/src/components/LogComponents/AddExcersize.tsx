import {useLogContext} from "../../contexts/LogContext.tsx";


export const AddExcersize = ({}) => {

    const {setAddExerciseMenu} = useLogContext();

    return (
        <div
            onClick={() => setAddExerciseMenu(true)}
            className={'add-exercise'}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            <h2 className={'font-bold text-base'}>Add exercise</h2>
        </div>
    )
}