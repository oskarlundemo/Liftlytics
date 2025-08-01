
import '../../../styles/Statistics/BentoBox.css'
import {AvgTimeWidget} from "./AvgTimeWidget.tsx";
import {PRCompoundsWidget} from "./PRCompoundsWidget.tsx";
import {WorkoutStreak} from "./WorkoutStreak.tsx";
import {WeeklyVolumeWidget} from "./WeeklyVolumeWidget.tsx";
import {WeightChartWidget} from "./WeightChartWidget.tsx";



export const BentoBox = ({}) => {

    const data = [
        { muscleGroup: "Chest", sets: 12 },
        { muscleGroup: "Back", sets: 10 },
        { muscleGroup: "Legs", sets: 18 },
    ];


    return (
        <section className={'bento-box-stats'}>

            <AvgTimeWidget boxIndex={4} avgTime={10}/>

            <PRCompoundsWidget boxIndex={2}/>

            <WorkoutStreak boxIndex={3} recordStreak={4} streakNumber={8}/>

            <WeeklyVolumeWidget muscleGroup={data} boxIndex={1}/>

            <WeightChartWidget boxIndex={5}/>

        </section>
    )


}