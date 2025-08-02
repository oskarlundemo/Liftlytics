import {useExerciseContext} from "../../contexts/ExerciseContext.tsx";
import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useEffect, useState} from "react";
import {useUpdateCustomExercise} from "../../hooks/exerciseHook.ts";


export const ExerciseForm = ({}) => {

    const {selectedExercise, setShowMenu, customExercises, setCustomExercises, allMuscleGroups, setShowPopUp} = useExerciseContext();
    const [exerciseName, setExerciseName] = useState<string>(selectedExercise.name);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [maxLength, setMaxLength ] = useState<number>(0);
    const { mutate: updateExercise, isError, error } = useUpdateCustomExercise(setCustomExercises);

    const [categoryId, setCategoryId] = useState<string>(
        selectedExercise?.muscleGroups[0]?.muscleGroup?.id || 'Undefined'
    );


    if (isError)
        console.log(error)

    useEffect(() => {
        setCategoryId(selectedExercise?.muscleGroups[0]?.muscleGroup?.id || 'Undefined');
    }, [selectedExercise]);


    useEffect(() => {
        setMaxLength(exerciseName.length);
    }, [exerciseName]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateExercise({
            id: selectedExercise.id,
            categoryId,
            exercise: selectedExercise,
            updatedName: exerciseName,
        });
    }

    return (
        <form className={'exercise-form flex h-full flex-grow flex-col p-4 justify-between'} onSubmit={handleSubmit}>

            <div className="form-header flex-row flex justify-between justify-end">
                <svg onClick={() => setShowMenu(false)} className={'error-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>

            <h1 className="font-bold text-3xl break-all">
                {exerciseName || <span className="opacity-0">Placeholder</span>}
            </h1>

            <div className="">

                <CustomInput
                    type="text"
                    isRequired={false}
                    value={exerciseName}
                    setState={setExerciseName}
                    name={exerciseName}
                    placeholder={selectedExercise.name}
                    example={'Name'}
                />

                <h4 style={{color: 'var(--color-text-muted)'}} className={'flex justify-end'}>{maxLength} / 100</h4>

            </div>

            <h2 className={'font-semibold text-xl mb-4'}>Category</h2>

            {allMuscleGroups ? (
                <div className="flex flex-wrap mb-auto gap-1">
                    {allMuscleGroups.map((group:any) => (
                        <button
                            type={'button'}
                            onClick={() => setCategoryId(group.id)}
                            className={`button-intellij ${categoryId !== group.id ? 'untoggled-btn' : ''}`}
                            key={group.id}>
                            {group.name}
                        </button>
                    ))}
                </div>
            ) : (
                <p>No categories could be retrieved</p>
            )}

            <div className="form-footer flex gap-3 justify-center w-full">
                <button
                    onClick={handleSubmit}
                    className="button-intellij !p-4 button-confirm !w-1/2"
                    disabled={disabledButton}>
                    Update
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowPopUp(true);
                        setShowMenu(false);
                    }}
                    className="button-intellij !p-4 button-warning !w-1/2"
                >
                    Delete this exercise
                </button>
            </div>


        </form>
    )

}