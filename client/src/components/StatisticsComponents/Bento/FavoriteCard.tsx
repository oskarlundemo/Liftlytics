

type FavoritePropsCard = {
    position: number;
    exercise: string;
    occurrence: number
}



export const FavoriteCard = ({position, exercise, occurrence}:FavoritePropsCard) => {


    return (
        <div className={'favorite-card'}>

            <h4>{position}. {exercise} {occurrence}</h4>

        </div>
    )

}