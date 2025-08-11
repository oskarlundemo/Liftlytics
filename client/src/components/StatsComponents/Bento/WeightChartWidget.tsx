import {useStatsContext} from "../../../contexts/StatsContext.tsx";

type WeightChartWidgetProps = {
    boxIndex: number,
}

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {CustomTooltip} from '../../MiscComponents/CustomToolTip.tsx'


export const WeightChartWidget = ({boxIndex}:WeightChartWidgetProps) => {

    const {bodyWeightData} = useStatsContext();

    return (
        <div  style={{
            gridArea: `box-${boxIndex}`,
            height: 'auto',
            overflow: 'hidden',
        }} className={`flex flex-col  weight-chart-wrapper widget box-${boxIndex}`}>

            <h3 className={'widget-title p-4'}>Body weight (kg)</h3>

            {bodyWeightData.length > 0 ? (

                <div style={{ flex: 1, minHeight: '300px' }}>
                    <ResponsiveContainer className={'outline-0'} width="100%" height="100%">
                        <LineChart data={bodyWeightData}>
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
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="bodyWeight"
                                stroke="cyan"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            ) : (
                <h4   style={{ color: 'var(--color-text-muted)' }} className={'flex align-middle m-auto color: text-color-muted my-5'} >No data yet</h4>
            )}
        </div>
    )

}