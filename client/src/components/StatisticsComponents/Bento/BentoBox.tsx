
import '../../../styles/Statistics/BentoBox.css'
import React from "react";
import {AvgTimeWidget} from "./AvgTimeWidget.tsx";
import {PRCompoundsWidget} from "./PRCompoundsWidget.tsx";
import {WorkoutStreak} from "./WorkoutStreak.tsx";
import {FavoriteExerciseWidget} from "./FavoriteExerciseWidget.tsx";
import {WeeklyVolumeWidget} from "./WeeklyVolumeWidget.tsx";



export const BentoBox = ({}) => {

    return (
        <section className={'bento-box-stats'}>

            <AvgTimeWidget boxIndex={4} avgTime={10}/>

            <PRCompoundsWidget boxIndex={2}/>

            <WorkoutStreak boxIndex={3} recordStreak={4} streakNumber={8}/>

            <FavoriteExerciseWidget boxIndex={1}/>


            <WeeklyVolumeWidget boxIndex={5}/>


        </section>
    )


}