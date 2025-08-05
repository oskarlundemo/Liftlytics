import {useStatsContext} from "../../../contexts/StatsContext.tsx";


type WorkoutsThisWeekWidgetProps = {
    boxIndex: number
}


export const WorkoutStreak = ({boxIndex}: WorkoutsThisWeekWidgetProps) => {

    const {workoutStreakData} = useStatsContext();

    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'streak-record widget'}>

            <h3 className={'widget-title'}>Workout streak</h3>

            <h4>{workoutStreakData?.currentStreak || 'Undefined'}</h4>

            <h5>Record: {workoutStreakData?.longestStreak || 'Undefined'}</h5>

        </div>
    )

}