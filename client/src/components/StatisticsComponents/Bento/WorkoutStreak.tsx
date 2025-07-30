

type WorkoutsThisWeekWidgetProps = {
    boxIndex: number
    streakNumber: number
    recordStreak: number
}


export const WorkoutStreak = ({streakNumber, boxIndex, recordStreak}: WorkoutsThisWeekWidgetProps) => {


    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'streak-record widget'}>

            <h3 className={'widget-title'}>Workout streak</h3>

            <h4>{streakNumber}</h4>


            <h5>Record: {recordStreak}</h5>

        </div>
    )

}