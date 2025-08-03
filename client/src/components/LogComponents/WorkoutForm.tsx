import {WorkoutData} from "./WorkoutData.tsx";
import '../../styles/Workout/NewWorkout.css'
import {AddExcersize} from "./AddExcersize.tsx";
import {ExerciseSelection} from "./ExerciseSelection.tsx";
import {useLogContext} from "../../contexts/LogContext.tsx";
import {Overlay} from "../MiscComponents/Overlay.tsx";
import {useEffect, useState} from "react";
import { motion} from 'framer-motion';
import {useFetchLogById, usePostWorkout, useUpdateWorkout} from "../../hooks/logHook.ts";
import {WorkoutHeader} from "./WorkoutHeader.tsx";
import {useParams} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {LoadingPage} from "../MiscComponents/LoadingPage.tsx";




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


export const WorkoutForm = ({} ) => {

    const savedState = JSON.parse(localStorage.getItem("workoutState") || "{}");

    const {showAddExerciseMenu, setShowExerciseMenu,
        setAddExerciseMenu, showConfigureExerciseMenu,
        setShowConfigureExerciseMenu, setShowCustomExerciseMenu
    } = useLogContext();

    const [disabled, setDisabled] = useState<boolean>(true);
    const [exercises, setExercises] = useState<ExerciseEntry[]>(savedState.exercises || []);
    const [workoutName, setWorkoutName] = useState<string>(savedState.workoutName || "");
    const [startDate, setStartDate] = useState<Date>(savedState.startDate ? new Date(savedState.startDate) : new Date());
    const [endDate, setEndDate] = useState<Date | null>(savedState.endDate ? new Date(savedState.endDate) : null);
    const [bodyWeight, setBodyWeight] = useState<number | null>(savedState.bodyWeight ?? null);
    const [startTime, setStartTime] = useState<Date>(savedState.startTime ? new Date(savedState.startTime) : new Date());
    const [endTime, setEndTime] = useState<Date | null>(savedState.endTime ? new Date(savedState.endTime) : null)
    const [notes, setNotes] = useState<string>(savedState.notes ? savedState.notes : '');

    useEffect(() => {
        const workoutState = {
            exercises,
            workoutName,
            startDate,
            endDate,
            startTime,
            endTime,
            notes,
            bodyWeight,
        };

        localStorage.setItem("workoutState", JSON.stringify(workoutState));

    }, [exercises, workoutName, startDate, endDate, bodyWeight, startTime, endTime, notes]);

    const {log_id} = useParams();
    const {data, isLoading: isLoadingFetch} = useFetchLogById(log_id!)

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
                id: exerciseEntry.exercise.id,
                localId: uuidv4(),
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

    const { mutate: submitWorkout} = usePostWorkout();
    const { mutate: updateWorkout } = useUpdateWorkout(log_id!);

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

        log_id ? updateWorkout(workoutData) : submitWorkout(workoutData);
    };

    if (isLoadingFetch) {
        return <LoadingPage title="Loading workout data..." />;
    }

    return (
        <motion.main
            className="new-workout-container main-box"
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 1, opacity: 1 }}
            exit={{ x: '100vw', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >
            <WorkoutHeader date={startDate} />

            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full gap-5">
                <section className="exercise-selection-container">
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
                        exercises={exercises}
                    />

                    {exercises && (
                        <ExerciseSelection
                            exercises={exercises}
                            setExercises={setExercises}
                        />
                    )}

                    <AddExcersize />
                </section>

                <Overlay
                    showOverlay={showAddExerciseMenu}
                    configureExercise={showConfigureExerciseMenu}
                    setShowOverlay={() => {
                        setAddExerciseMenu(false);
                        setShowExerciseMenu(false);
                        setShowConfigureExerciseMenu(false);
                        setShowCustomExerciseMenu(false);
                    }}
                />

                <button disabled={disabled} className="button-intellij" type="submit">
                    <p style={{ margin: 0 }}>{log_id ? 'Save' : 'Create'}</p>
                </button>
            </form>
        </motion.main>
    );
}