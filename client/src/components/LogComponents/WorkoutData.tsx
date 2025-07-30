import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {CustomTimePicker} from "./CustomTimePicker.tsx";
import {NotesComponent} from "./Notes.tsx";
import {BodyWeight} from "./BodyWeight.tsx";
import {SlideInBottomMenu} from "../MiscComponents/SlideInBottomMenu.tsx";
import {CategorySelection} from "./CategorySelection.tsx";
import {SlideInSideMenu} from "../MiscComponents/SlideInSideMenu.tsx";
import {Exercises} from "./Exercises.tsx";
import '../../styles/Workout/Workout.css'
import {useLogContext} from "../../contexts/LogContext.tsx";
import {CustomExercise} from "./CustomExercise.tsx";


type WorkoutDataProps = {
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;

    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;

    endDate: Date;
    setEndDate: React.Dispatch<React.SetStateAction<Date>>;

    startTime: Date;
    setStartTime: React.Dispatch<React.SetStateAction<Date>>;

    endTime: Date;
    setEndTime: React.Dispatch<React.SetStateAction<Date>>;

    bodyWeight: number | null;
    setBodyWeight: React.Dispatch<React.SetStateAction<number | null>>;

    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;

    setExercises: React.Dispatch<React.SetStateAction<any[]>>;
    exercises: object
};



export const WorkoutData = ({
                                workoutName,
                                setWorkoutName,
                                startDate,
                                setStartDate,
                                endDate,
                                setEndDate,
                                startTime,
                                setStartTime,
                                endTime,
                                setEndTime,
                                bodyWeight,
                                setBodyWeight,
                                notes,
                                setNotes,
                                setExercises,
                                exercises
                            }: WorkoutDataProps) => {

    const {showAddExerciseMenu, showCustomExerciseMenu, showExerciseMenu} = useLogContext();

    return (
            <section className="new-workout-data">

                <CustomInput
                    type="text"
                    setState={setWorkoutName}
                    example={'Name'}
                    value={workoutName}
                    name="workoutName"
                    isRequired={false}
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

            </section>
    )
}