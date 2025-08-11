import {MenuHeader} from "./MenuHeader.tsx";
import {useLogContext} from "../../contexts/LogContext.tsx";
import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useEffect, useState} from "react";
import {useCustomExercise} from "../../hooks/logHook.ts";


export const CustomExercise = ({}) => {

    const { setShowCustomExerciseMenu, selectedMuscleGroup, setSelectedExercises} = useLogContext();
    const [exerciseName, setExerciseName] = useState<string>('');
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [maxLength, setMaxLength ] = useState<number>(0);
    const nameMaxLenght = 100;


    const { mutate: createExercise } = useCustomExercise({
        onSuccess: (data:any) => {
            setSelectedExercises((prevCategories: any[]) => [
                ...prevCategories,
                data.exercise
                ]
            );
        },
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            exerciseName.length >= 100 &&
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)
        ) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        setMaxLength(exerciseName.length);
        setDisabledButton(!(exerciseName.length <= nameMaxLenght && exerciseName.trim().length > 0));
    }, [exerciseName]);

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
                    keyDownAction={(e) => handleKeyDown(e)}
                />


                <h4
                    style={{ color: maxLength >= 100 ? 'var(--color-error)' : 'var(--color-text-muted)', transition: 'var(--transition-fast)' }}
                    className={`flex justify-end ${maxLength >= 100 ? 'text-2xl' : 'text-xl'}`}
                >
                    {maxLength} / 100
                </h4>

                <button disabled={disabledButton} onClick={handleSubmit} className="button-intellij">Save</button>

            </div>

        </section>
    )

}