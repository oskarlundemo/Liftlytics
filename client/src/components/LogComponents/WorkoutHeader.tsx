import {useNavigate, useParams} from "react-router-dom";
import {useLogContext} from "../../contexts/LogContext.tsx";
import {useUpdateExercise} from "../../hooks/logHook.ts";


type WorkoutHederProps = {
    date: Date;
    exercises: any[];
}


export const WorkoutHeader = ({date, exercises} : WorkoutHederProps) => {

    const navigate = useNavigate();
    const {setIsEditing, isEditing} = useLogContext();
    const {log_id} = useParams();
    const {mutate: updateExercise} = useUpdateExercise(log_id!);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
    });

    const handleSave = () => {

        if (!log_id)  {
            setIsEditing(false);
            return
        }

        updateExercise(exercises);
        setIsEditing(false);
    }

    return (
        <header
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                position: "relative",
            }}
            className="workout-header p-4"
        >
            <svg
                style={{ margin: '1rem' }}
                onClick={() => {navigate(-1)}}
                className="hover-svg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
            >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>

            <h1
                style={{
                    margin: 0,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                }}
                className="workout-title"
            >
                {formattedDate}
            </h1>

            <div className={`edit-icon flex flex-col self-center`}>

                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className={'flex subtle-grey-button font-semibold gap-2 flex-row-reverse items-center'} type={'button'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        Edit
                    </button>
                ) : (
                    <button onClick={() => handleSave()} className={'flex subtle-grey-button font-semibold gap-2 flex-row-reverse items-center'} type={'button'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
                        Save
                    </button>
                )}
            </div>

        </header>
    )

}