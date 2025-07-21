import {CustomInput} from "../AccessPortalComponents/CustomInput.tsx";
import {CustomTimePicker} from "./CustomTimePicker.tsx";
import {NotesComponent} from "./Notes.tsx";
import {BodyWeight} from "./BodyWeight.tsx";
import {useState} from "react";
import {SlideInBottomMenu} from "../MiscComponents/SlideInBottomMenu.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {CategorySelection} from "./CategorySelection.tsx";
import {SlideInSideMenu} from "../MiscComponents/SlideInSideMenu.tsx";
import {Exercises} from "./Exercises.tsx";


export const WorkoutData = () => {

    const [workoutName, setWorkoutName] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [bodyWeight, setBodyWeight] = useState<number>(0);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const [notes, setNotes] = useState<string>('');
    const {showAddExerciseMenu, showExerciseMenu} = useLog();

    return (
            <section className="new-workout-data">

                <CustomInput
                    type="text"
                    setState={setWorkoutName}
                    example={'Name'}
                    value={workoutName}
                    name="workoutName"
                />

                <CustomTimePicker
                    title={'Start date'}
                    date={startDate}
                    setDate={setStartDate}
                    time={startTime}
                    setTime={setStartTime}
                />

                <CustomTimePicker
                    title={'End date'}
                    date={endDate}
                    setTime={setEndTime}
                    time={endTime}
                    setDate={setEndDate}
                />

                <BodyWeight
                    weight={bodyWeight}
                    setWeight={setBodyWeight}
                />

                <NotesComponent
                    notes={notes}
                    setNotes={setNotes}
                />

                <SlideInBottomMenu
                    showMenu={showAddExerciseMenu}
                    children={
                        <CategorySelection/>
                    }
                />

                <SlideInSideMenu
                    showMenu={showExerciseMenu}
                    children={
                        <Exercises/>
                    }
                />

            </section>
    )
}