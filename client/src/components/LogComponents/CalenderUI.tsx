
type CalenderUIProps = {
    startTime: string;
}

export const CalenderUI = ({ startTime }: CalenderUIProps) => {
    const date = new Date(startTime);

    return (
        <div className="calender-ui">
            <p>{date.toLocaleDateString(undefined, { weekday: 'long' })}</p>
            <p>{date.getDate()}</p>
        </div>
    );
}
