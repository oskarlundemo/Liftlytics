

import '../../../styles/Statistics/Stats.css'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {useStatsContext} from "../../../contexts/StatsContext.tsx";


type CheckedCalenderProps = {
    boxIndex: number
}



export const CheckedCalender = ({boxIndex}: CheckedCalenderProps) => {

    const {checkedCalenderDates} = useStatsContext();

    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={`checked-calender widget box-${boxIndex}`}>

            <DayPicker
                mode="single"
                selected={checkedCalenderDates.map(d => new Date(d.startDate))}
                disabled
                modifiers={{ highlighted: checkedCalenderDates.map(d => new Date(d.startDate)) }}
                modifiersClassNames={{ highlighted: 'highlighted-day' }}
                className={'dp-full-width'}
                wrapperClassName={'dp-full-width'}
            />

            <h3 className={'!text-sm text-center'}style={{color: 'var(--color-text-muted)'}}>Every dot is a completed workout</h3>
        </div>
    )
}