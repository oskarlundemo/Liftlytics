import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'
import {AddExcersize} from "./AddExcersize.tsx";
import {ExerciseSelection} from "./ExerciseSelection.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {Overlay} from "../MiscComponents/Overlay.tsx";
import {useEffect, useState} from "react";
import { motion } from 'framer-motion';
import {useFetchLogById, usePostWorkout, useUpdateWorkout} from "../../hooks/logHook.ts";
import toast from "react-hot-toast";
import {WorkoutHeader} from "./WorkoutHeader.tsx";
import {useParams} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


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

    const {log_id} = useParams();
    const {data} = useFetchLogById(log_id)

    useEffect(() => {
        if (data?.workout) {
            const workout = data.workout;

            setWorkoutName(workout.name || '');
            setStartDate(new Date(workout.startTime));
            setStartTime(new Date(workout.startTime));

            if (workout.endTime) {
                // @ts-ignore
                setEndDate(new Date(workout.endTime));
                // @ts-ignore
                setEndTime(new Date(workout.endTime));
            }

            setBodyWeight(workout.bodyWeight);
            setNotes(workout.notes || '');

            const transformedExercises: ExerciseEntry[] = workout.exercises.map((exerciseEntry: { exercise: { name: any; }; metrics: any[]; }) => ({
                id: uuidv4(),
                name: exerciseEntry.exercise.name,
                sets: exerciseEntry.metrics.map((metric) => ({
                    id: metric.id,
                    reps: metric.reps || 0,
                    weight: metric.weight || 0,
                })),
            }));

            setExercises(transformedExercises);
        }

    }, [data]);

    useEffect(() => {
        setDisabled(exercises.length === 0);
    }, [exercises]);


    const { mutate: submitWorkout, isPending: isCreating, isError: isCreateError } = usePostWorkout();
    const { mutate: updateWorkout, isPending: isUpdating, isError: isUpdateError } = useUpdateWorkout(log_id);


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

        if (log_id) {
            updateWorkout(workoutData, log_id);
        } else
            submitWorkout(workoutData);

        if (isUpdateError) {
            toast.error("Error updating workout");
        } else {
            toast.success("Workout was successfully updated!");
        }

        if (isCreateError)
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
                date={startDate}
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

                <button disabled={disabled} className={'button-intellij'} type={"submit"}>{log_id ? (
                    <p style={{
                        margin: '0'
                    }}>Save</p>
                ) : (
                    <p style={{
                        margin: '0'
                    }}>Submit</p>
                )}</button>

            </form>

        </motion.main>
    )
}