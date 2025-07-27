import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'
import {AddExcersize} from "./AddExcersize.tsx";
import {ExerciseSelection} from "./ExerciseSelection.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {Overlay} from "../MiscComponents/Overlay.tsx";
import {useEffect, useState} from "react";
import { motion } from 'framer-motion';
import {usePostWorkout} from "../../hooks/logHook.ts";
import toast from "react-hot-toast";
import {WorkoutHeader} from "./WorkoutHeader.tsx";


type NewWorkoutProps = {
    setExercises: React.Dispatch<React.SetStateAction<any[]>>
};


export type ExerciseSet = {
    id: number;
    reps?: number;
    weight?: number;
};

export type ExerciseEntry = {
    id: string;
    name: string;
    sets: ExerciseSet[];
};


export const NewWorkoutPage = ({} : NewWorkoutProps) => {

    const {showAddExerciseMenu, setShowExerciseMenu, setAddExerciseMenu, showConfigureExerciseMenu, setShowConfigureExerciseMenu} = useLog();
    const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
    const [workoutName, setWorkoutName] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<null>(null);
    const [bodyWeight, setBodyWeight] = useState<null>(null);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<null>(null);
    const [notes, setNotes] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        setDisabled(exercises.length === 0);
    }, [exercises]);

    const { mutate: submitWorkout, isPending, isError } = usePostWorkout();

    const handleSubmit = (e) => {

        e.preventDefault();

        const workoutData = {
            workoutName,
            startDate,
            endDate,
            startTime,
            endTime,
            bodyWeight,
            notes,
            exercises,
        };

        submitWorkout(workoutData);

        if (isError)
            toast.error("Error creating workout");
        else
            toast.success("Workout was successfully saved!");
    };

    return (

        <motion.main
            className="new-workout-container main-box"
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100vw', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >

            <WorkoutHeader
                title={'17 juni'}
            />

            <form onSubmit={handleSubmit} className="new-workout-container main-box">

                <section className={'exercise-selection-container'}>

                    <WorkoutData
                        workoutName={workoutName}
                        setWorkoutName={setWorkoutName}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                        bodyWeight={bodyWeight}
                        setBodyWeight={setBodyWeight}
                        notes={notes}
                        setNotes={setNotes}
                        setExercises={setExercises}
                    />

                    {exercises && (
                        <ExerciseSelection
                            exercises={exercises}
                            setExercises={setExercises}
                        />
                    )}

                    <AddExcersize/>

                </section>

                <Overlay
                    showOverlay={showAddExerciseMenu }
                    configureExercise={showConfigureExerciseMenu}
                    setShowOverlay={() => {
                        setAddExerciseMenu(false);
                        setShowExerciseMenu(false);
                        setShowConfigureExerciseMenu(false);
                    }}
                />

                <button disabled={disabled} className={'button-intellij'} type={"submit"}>Submit</button>

            </form>

        </motion.main>
    )
}