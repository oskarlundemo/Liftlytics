
type ExerciseCardProps = {
    title: string,
}


export const ExerciseCard = ({title}: ExerciseCardProps) => {

    return (
            <div className={'exercise-card'}>
                <h2>{title}</h2>
            </div>
        )
}