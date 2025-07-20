import {CustomInput} from "../AccessPortalComponents/CustomInput.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {CustomTimePicker} from "./CustomTimePicker.tsx";
import {NotesComponent} from "./Notes.tsx";
import {BodyWeight} from "./BodyWeight.tsx";
import {useState} from "react";


export const WorkoutData = () => {

    const {workoutName, setWorkoutName} = useLog();
    const [notes, setNotes] = useState<string>('');

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
                />

                <CustomTimePicker
                    title={'End date'}
                />

                <BodyWeight />

                <NotesComponent
                    notes={notes}
                    setNotes={setNotes}
                />

            </section>
    )
}