
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
            className={`pr-widget widget box-${boxIndex}`}>

            <h3 className={'widget-title p-4'}>PR compounds</h3>

            {best1RM && best1RM.length > 0 ? (
                best1RM.map((best1RM, index) => (
                    <PrCard
                        key={index}
                        weight={best1RM.weight}
                        exercise={best1RM.exercise}
                        date={best1RM.date}
                    />
                ))
            ) : (
                <h4 style={{color: 'var(--color-text-muted)'}} className='text-center text-base my-5'>No data yet</h4>
            )}

        </div>

    )


}