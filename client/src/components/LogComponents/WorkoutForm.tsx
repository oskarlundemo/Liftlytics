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
import {SlideInBottomMenu} from "../MiscComponents/SlideInBottomMenu.tsx";
import {CategorySelection} from "./CategorySelection.tsx";
import {SlideInSideMenu} from "../MiscComponents/SlideInSideMenu.tsx";
import {Exercises} from "./Exercises.tsx";
import {CustomExercise} from "./CustomExercise.tsx";




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

    const {setShowExerciseMenu, setAddExerciseMenu, showCustomExerciseMenu, showExerciseMenu, showAddExerciseMenu,
        showConfigureExerciseMenu, setShowConfigureExerciseMenu, setShowCustomExerciseMenu } = useLogContext();

    const [disabled, setDisabled] = useState<boolean>(true);
    const [exercises, setExercises] = useState<ExerciseEntry[]>(savedState.exercises || []);
    const [workoutName, setWorkoutName] = useState<string>(savedState.workoutName || "");
    const [startDate, setStartDate] = useState<Date>(savedState.startDate ? new Date(savedState.startDate) : new Date());
    const [endDate, setEndDate] = useState<Date>(savedState.endDate ? new Date(savedState.endDate) : new Date());
    const [bodyWeight, setBodyWeight] = useState<number | null>(savedState.bodyWeight ?? null);
    const [startTime, setStartTime] = useState<Date>(savedState.startTime ? new Date(savedState.startTime) : new Date());
    const [endTime, setEndTime] = useState<Date>(savedState.endTime ? new Date(savedState.endTime) : new Date());
    const [notes, setNotes] = useState<string>(savedState.notes ? savedState.notes : '');

    useEffect(() => {

        if (!data?.workout) {
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
        }

    }, [exercises, workoutName, startDate, endDate, bodyWeight, startTime, endTime, notes]);

    const {log_id} = useParams();
    const {data, isLoading: isLoadingFetch} = useFetchLogById(log_id!)

    useEffect(() => {

        if (data?.workout) {
            const workout = data.workout;

            setWorkoutName(workout.name || '');
            setStartDate(new Date(workout.startDate));
            setStartTime(new Date(workout.startTime));
            setEndDate(new Date(workout.endTime));
            setEndTime(new Date(workout.endTime));
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
        setDisabled(exercises.length === 0 || workoutName.length > 100 || notes.length > 1000 || bodyWeight?.toString().length > 5);
    }, [exercises, workoutName, notes, bodyWeight]);

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
            className="new-workout-container overflow-hidden main-box h-screen"
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 1, opacity: 1 }}
            exit={{ x: '100vw', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        >
            <div className="flex flex-col w-full h-full overflow-y-auto">
            <WorkoutHeader date={startDate} exercises={exercises} />

            <form onSubmit={handleSubmit} className="flex z-0 flex-col w-full gap-5">
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
                    />

                    {exercises && (
                        <ExerciseSelection
                            exercises={exercises}
                            setExercises={setExercises}
                        />
                    )}

                    <AddExcersize />
                </section>

                <button disabled={disabled} className="attention-button" type="submit">
                    <p style={{ margin: 0 }}>{log_id ? 'Save' : 'Create'}</p>
                </button>

            </form>


            <SlideInBottomMenu
                showMenu={showAddExerciseMenu}
                children={
                    <CategorySelection
                        exercises={exercises}
                        setExercises={setExercises}
                    />
                }
            />

            <SlideInSideMenu
                showMenu={showExerciseMenu}
                children={
                    <Exercises
                        setExercises={setExercises}
                    />
                }
            />

            <SlideInSideMenu
                showMenu={showCustomExerciseMenu}
                children={
                    <CustomExercise
                        setExercises={setExercises}
                    />
                }
                fromLeft={true}
            />

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

            </div>

        </motion.main>
    );
}