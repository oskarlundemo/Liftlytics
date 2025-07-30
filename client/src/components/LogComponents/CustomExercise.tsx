import {MenuHeader} from "./MenuHeader.tsx";
import {useLogContext} from "../../contexts/LogContext.tsx";
import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useState} from "react";
import {useCustomExercise} from "../../hooks/logHook.ts";


export const CustomExercise = ({}) => {

    const { setShowCustomExerciseMenu, selectedMuscleGroup, setSelectedExercises} = useLogContext();
    const [exerciseName, setExerciseName] = useState<string>('');

    const { mutate: createExercise } = useCustomExercise({
        onSuccess: (data:any) => {
            setSelectedExercises((prevCategories: any[]) => [
                ...prevCategories,
                data.exercise
                ]
            );
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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