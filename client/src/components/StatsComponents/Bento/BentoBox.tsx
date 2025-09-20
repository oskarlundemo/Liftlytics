
import '../../../styles/Statistics/BentoBox.css'
import {AvgTimeWidget} from "./AvgTimeWidget.tsx";
import {PRCompoundsWidget} from "./PRCompoundsWidget.tsx";
import {WorkoutStreak} from "./WorkoutStreak.tsx";
import {MonthlyVolumeWidget} from "./MonthlyVolumeWidget.tsx";
import {WeightChartWidget} from "./WeightChartWidget.tsx";
import {CheckedCalender} from "./CheckedCalender.tsx";



export const BentoBox = ({}) => {


    return (
        <section className={'bento-box-stats'}>

            <AvgTimeWidget boxIndex={6}/>

            <PRCompoundsWidget boxIndex={2}/>

            <WorkoutStreak boxIndex={3}/>

            <MonthlyVolumeWidget boxIndex={1}/>

            <WeightChartWidget boxIndex={5}/>

            <CheckedCalender boxIndex={4}/>

        </section>
    )
}