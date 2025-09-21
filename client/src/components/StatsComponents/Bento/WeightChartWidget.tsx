import {useStatsContext} from "../../../contexts/StatsContext.tsx";
import moment from 'moment';

type WeightChartWidgetProps = {
    boxIndex: number,
}

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {CustomTooltip} from '../../MiscComponents/CustomToolTip.tsx'
import {useEffect, useState} from "react";


export const WeightChartWidget = ({boxIndex}:WeightChartWidgetProps) => {

    const {bodyWeightData} = useStatsContext();
    const [dataRange, setDataRange] = useState<any[]>([]);
    const [buttonIndex, setButtonIndex] = useState<number>(0);

    useEffect(() => {
        handleDateChange('1m', 0)
    }, [bodyWeightData]);

    const areaColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim();

    const handleDateChange = (range:string, index:number) => {

        if (!range)
            return;

        setButtonIndex(index)
        const months = Number(range.split('m')[0]);

        const today = moment();
        const monthsAgo = today.clone().subtract(months, 'months');

        const filtered = bodyWeightData
            .filter(d => {
                const date = moment(d.date);
                return date.isSameOrBefore(today) && date.isSameOrAfter(monthsAgo);
            })
            .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());

        setDataRange(filtered);
    }


    return (
        <div  style={{
            gridArea: `box-${boxIndex}`,
            height: 'auto',
            overflow: 'hidden',
        }} className={`flex flex-col  weight-chart-wrapper widget box-${boxIndex}`}>

            <h3 className={'widget-title p-4'}>Body weight (kg)</h3>

            {bodyWeightData.length > 0 ? (
                <>
                <div style={{ flex: 1, minHeight: '300px' }}>
                    <ResponsiveContainer className={'outline-0'} width="100%" height="100%">
                        <AreaChart data={dataRange}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date"
                                   tickFormatter={(dateStr) => {
                                       const date = new Date(dateStr);
                                       const day = date.getDate();
                                       const month = date.toLocaleString('default', { month: 'short' });
                                       return `${day} ${month}`;
                                   }}
                            />
                            <YAxis/>
                            <Tooltip
                                content={<CustomTooltip/>}
                            />
                            <Area
                                type="monotone"
                                dataKey="bodyWeight"
                                stroke={areaColor}
                                fill={areaColor}
                                activeDot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                    <div className={'flex flex-row justify-center gap-5'}>
                        <button className={`button-subtle ${buttonIndex == 0 ? 'selected ' : ''}`} onClick={() => handleDateChange('1m', 0)} >1 month</button>
                        <button className={`button-subtle ${buttonIndex == 1 ? 'selected ' : ''}`}onClick={() => handleDateChange('6m', 1)}>6 months</button>
                        <button className={`button-subtle ${buttonIndex == 2 ? 'selected ' : ''}`} onClick={() => handleDateChange('12m', 2)}>1 year</button>
                    </div>
                </>

            ) : (
                <h4   style={{ color: 'var(--color-text-muted)' }} className={'flex align-middle m-auto color: text-color-muted my-5'} >No data yet</h4>
            )}
        </div>
    )

}