import {MenuHeader} from "./MenuHeader.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useState} from "react";
import {useCustomExercise} from "../../hooks/logHook.ts";


export const CustomExercise = ({}) => {

    const { setShowCustomExerciseMenu, selectedMuscleGroup} = useLog();
    const [exerciseName, setExerciseName] = useState<string>('');
    const {
        mutate: createExercise,
        isPending,
        isError,
        data,
        error
    } = useCustomExercise();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        console.log(exerciseName);
        console.log(selectedMuscleGroup);

        createExercise({
            muscleGroup: selectedMuscleGroup,
            name: exerciseName,
        });
    }


    return (
        <section className="custom-exercise">

            <MenuHeader
                search={false}
                setUI={setShowCustomExerciseMenu}
                header={'Custom exercise'}
                arrow={true}
                arrowRight={true}
                addExercise={false}
            />

            <div onSubmit={(e) => handleSubmit(e)} className="custom-exercise-form">

                <CustomInput
                    type={'text'}
                    name={'exerciseName'}
                    value={exerciseName}
                    setState={setExerciseName}
                    example={'Name'}
                />


                <button onClick={handleSubmit} className="button-intellij">Save</button>

            </div>

        </section>
    )

}