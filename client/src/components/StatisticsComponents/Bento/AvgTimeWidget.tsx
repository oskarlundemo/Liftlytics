

type AvgTimeWidgetProps = {
    boxIndex: number
    avgTime: number
}


export const AvgTimeWidget = ({boxIndex, avgTime}: AvgTimeWidgetProps) => {

    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'avg-time-widget widget'}>

            <h3 className={'widget-title'}>Average workout duration</h3>

            <h4>{avgTime || 120} min</h4>

        </div>
    )
}