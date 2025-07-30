import {CalenderUI} from "./CalenderUI.tsx";
import '../../styles/LogPage/LogPage.css'
import {useLogContext} from "../../contexts/LogContext.tsx";
import {useNavigate} from "react-router-dom";



type LogCardProps = {
    startTime: string,
    workoutName: string
    exercises: object[]
    id: string
}


export const LogCard = ({startTime, id, workoutName, exercises}: LogCardProps) => {

    const {setShowDeleteMenu, setDeleteLogId} = useLogContext();
    const navigate = useNavigate();

    const deleteWorkout = (id:string) => {
        setShowDeleteMenu(true)
        setDeleteLogId(id)
    }

    return (
        <article
            onClick={() => {
                navigate(`/log/${id}`)
            }}
            className="log-card">
            <CalenderUI startTime={startTime}/>

            <div className="log-card__body">
                <h4>{parseWorkoutName(workoutName, startTime) || 'Undefined'}</h4>

                {exercises && exercises.length > 0 && (
                    exercises.map((exercise, index) => (
                        <h5 key={index}>{exercise.metrics.length} x {exercise.exercise.name}</h5>
                    ))
                )}
            </div>

            <svg onClick={(e) => {
                deleteWorkout(id)
                e.stopPropagation()
            }} className={'error-svg delete-log-icon'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>

        </article>
    )
}


const parseWorkoutName = (workoutName: string, startTime: string) => {

    if (workoutName && workoutName.trim().length > 0) {
        return workoutName;
    }

    const hour = new Date(startTime).getHours();

    let timeLabel = '';

    if (hour >= 5 && hour < 9) {
        timeLabel = 'Morning Workout';
    } else if (hour >= 9 && hour < 12) {
        timeLabel = 'Midday Workout';
    } else if (hour >= 12 && hour < 14) {
        timeLabel = 'Lunch Workout';
    } else if (hour >= 14 && hour < 17) {
        timeLabel = 'Afternoon Workout';
    } else if (hour >= 17 && hour < 20) {
        timeLabel = 'Evening Workout';
    } else if (hour >= 20 && hour <= 23) {
        timeLabel = 'Night Workout';
    } else {
        timeLabel = 'Late Night Workout';
    }

    return `${timeLabel}`;
};