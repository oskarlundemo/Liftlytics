
import {PrCard} from "./PrCard.tsx";
import {useStatsContext} from "../../../contexts/StatsContext.tsx";


type PRCompoundsWidgetProps = {
    boxIndex: number
}



export const PRCompoundsWidget = ({boxIndex}:PRCompoundsWidgetProps) => {

    const {best1RM} = useStatsContext();

    return (

        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'pr-widget widget'}>

            <h3 className={'widget-title'}>PR compounds</h3>

            {best1RM && (
                best1RM.map((best1RM, index) => (
                    <PrCard
                        key={index}
                        weight={best1RM.weight}
                        exercise={best1RM.exercise}
                        date={best1RM.date}
                    />
                ))
            )}

        </div>

    )


}