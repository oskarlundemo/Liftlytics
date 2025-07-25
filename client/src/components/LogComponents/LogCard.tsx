import {CalenderUI} from "./CalenderUI.tsx";
import '../../styles/LogPage/LogPage.css'


type LogCardProps = {
    startTime: string,
    workoutName: string
    exercises: object[]
}


export const LogCard = ({startTime, workoutName, exercises}: LogCardProps) => {

    return (
        <article className="log-card">
            <CalenderUI startTime={startTime}/>

            <div className="log-card__body">
                <h4>{parseWorkoutName(workoutName, startTime) || 'Undefined'}</h4>

                {exercises && exercises.length > 0 && (
                    exercises.map((exercise, index) => (
                        <h5 key={index}>1 x Rygg</h5>
                    ))
                )}

            </div>

        </article>
    )
}


const parseWorkoutName = (workoutName: string, startTime: Date) => {

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