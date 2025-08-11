



type PrCardProps = {
    weight: number;
    exercise: string;
    date?: Date;
}


export const PrCard = ({weight, exercise, date}: PrCardProps) => {

    return (
        <div className={'pr-card'}>
            <h4>{exercise}</h4>
            <h4>{weight || 'No data yet'} kg</h4>
            <h4>{date?.toString().split('T')[0] || '-'}</h4>
        </div>
    )
}