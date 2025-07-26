import '../../styles/LogPage/LogPage.css'
type CalenderUIProps = {
    startTime: string;
}

export const CalenderUI = ({ startTime }: CalenderUIProps) => {
    const date = new Date(startTime);

    return (
        <div className="calender-ui">
            <p>{date.toLocaleDateString('en-Us', { weekday: 'short'  })}</p>
            <p>{date.getDate()}</p>
        </div>
    );
}
