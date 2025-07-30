import {PrCard} from "./PrCard.tsx";
import {FavoriteCard} from "./FavoriteCard.tsx";


type FavoriteProps = {
    boxIndex: number
}



export const FavoriteExerciseWidget = ({boxIndex}: FavoriteProps) => {

    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'favorite-exercise widget'}>

            <h3 className={'widget-title'}>Favorite exercises</h3>

            <FavoriteCard position={1} exercise={'Barbell curls'} occurrence={5}/>

            <FavoriteCard position={2} exercise={'Hammer curls'} occurrence={5}/>

            <FavoriteCard position={3} exercise={'Rope pulldowns'} occurrence={5}/>

        </div>

    )

}