
import {PrCard} from "./PrCard.tsx";


type PRCompoundsWidgetProps = {
    boxIndex: number
}



export const PRCompoundsWidget = ({boxIndex}:PRCompoundsWidgetProps) => {


    return (

        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'pr-widget widget'}>

            <h3 className={'widget-title'}>PR compounds</h3>

            <PrCard
                exercise={'Bench press'}
                weight={200}
            />

            <PrCard
                exercise={'Squat'}
                weight={200}
            />

            <PrCard
                exercise={'Deadlift'}
                weight={200}
            />

        </div>

    )


}