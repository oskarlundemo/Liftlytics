import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {CustomTimePicker} from "../MiscComponents/CustomTimePicker.tsx";
import {CustomTextarea} from "../MiscComponents/CustomTextarea.tsx";
import {BodyWeight} from "./BodyWeight.tsx";
import '../../styles/Workout/Workout.css';


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
                            }: WorkoutDataProps) => {

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
                    setDate={setEndDate}
                    setTime={setEndTime}
                    time={endTime}
                />

                <BodyWeight
                    weight={bodyWeight}
                    setWeight={setBodyWeight}
                />

                <CustomTextarea
                    notes={notes}
                    setNotes={setNotes}
                    maxInput={1000}
                />

            </section>
    )
}