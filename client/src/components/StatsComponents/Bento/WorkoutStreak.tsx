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
            className={`streak-record widget align-middle justify-around box-${boxIndex}`}>

            <h3 className={'widget-title p-4'}>Workout streak</h3>

            <h4 className={"flex-grow h-fit flex items-center justify-center"}>
                {workoutStreakData?.currentStreak || 'Undefined'}
            </h4>

            <h5 className={'text-sm font-semibold'} style={{color: 'var(--color-text-muted)'}}>
                Record: {workoutStreakData?.longestStreak || 'Undefined'}
            </h5>
        </div>
    )

}