import {useStatsContext} from "../../../contexts/StatsContext.tsx";
import {useEffect, useState} from "react";


type AvgTimeWidgetProps = {
    boxIndex: number
    avgTime?: number
}


export const AvgTimeWidget = ({boxIndex, avgTime}: AvgTimeWidgetProps) => {

    const {averageDuration} = useStatsContext();
    const [isTrending, setIsTrending] = useState(false);

    useEffect(() => {
        if (averageDuration)
            setIsTrending(averageDuration?.avgThisMonth?.avgMinutes > averageDuration?.avgAllTime?.avgMinutes);
    }, [averageDuration]);

    const parseTime = (minutes) => {

        if (minutes <= 60) {
            return `${Math.round(minutes)} m`;
        }

        const hours = Math.floor((minutes/60) % 60);
        const overflowingMinutes  = Math.floor((minutes/60) % 60);

        return `${hours} h ${Math.round(overflowingMinutes)} m`;
    }

    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={`avg-time-widget widget box-${boxIndex}`}>

            <h3 className={'widget-title text-center'}>Average workout duration this month</h3>

            <div className={'avg-minutes flex flex-grow flex-row items-center gap-5 justify-end'}>

                <h4>{parseTime(averageDuration?.avgThisMonth?.avgMinutes)}</h4>

                {isTrending ? (
                    <svg  className="w-12 h-12"
                           style={{fill: 'var(--color-success)'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/></svg>
                ) : (
                    <svg  className="w-12 h-12"
                           style={{fill: 'var(--color-error)'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z"/></svg>
                )}

            </div>

            <h5 className={'text-sm font-semibold'} style={{color: 'var(--color-text-muted)'}}>
                Overall average: {parseTime(averageDuration?.avgAllTime?.avgMinutes)}
            </h5>

        </div>
    )
}