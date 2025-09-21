import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useEffect, useState} from "react";


type CreateFormProps = {
    setShowCreateMenu: (showCreateMenu: boolean) => void;
    muscleGroups?: any
    handleCreateExercise?: Function;
    handleCreateMuscleGroup?: Function;
}

export const CreateConfigureForm = ({setShowCreateMenu, handleCreateExercise, handleCreateMuscleGroup, muscleGroups}:CreateFormProps) => {

    const [exerciseName, setExerciseName] = useState<string>('');
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [maxLength, setMaxLength ] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<string>('')
    const nameMaxLenght = 100;

    useEffect(() => {
        setMaxLength(exerciseName.length);
        setDisabledButton(!(exerciseName.length <= nameMaxLenght && exerciseName.trim().length > 0 && (categoryId.trim().length > 0 || !muscleGroups)));
    }, [exerciseName, categoryId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (handleCreateExercise)
            handleCreateExercise({
                exerciseName: exerciseName,
                categoryId: categoryId,
            });

        if (handleCreateMuscleGroup)
            handleCreateMuscleGroup({
                muscleGroupName: exerciseName,
            })

        setShowCreateMenu(false);
    }


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            exerciseName.length >= 100 &&
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)
        ) {
            e.preventDefault();
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={'exercise-form flex h-full flex-grow flex-col p-4'}>

                <div className="form-header flex-row flex justify-end">
                    <svg onClick={() => setShowCreateMenu(false)} className={'error-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
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
                        placeholder={'Give it a name...'}
                        example={'Name'}
                        keyDownAction={(e) => handleKeyDown(e)}
                    />

                    <h4
                        style={{ color: maxLength >= 100 ? 'var(--color-error)' : 'var(--color-text-muted)', transition: 'var(--transition-fast)' }}
                        className={`flex justify-end ml-auto ${maxLength >= 100 ? 'text-2xl' : 'text-xl'}`}
                    >
                        {maxLength} / 100
                    </h4>

                </div>


            {muscleGroups && (
                muscleGroups.length > 0 ? (
                    <>
                        <h2 className="font-semibold text-xl mb-4">Select a muscle group</h2>

                        <div className="flex flex-wrap mb-auto gap-1">
                            {muscleGroups.map((group: any) => (
                                <button
                                    type="button"
                                    onClick={() => setCategoryId(group.id)}
                                    className={`button-intellij ${categoryId !== group.id ? 'untoggled-btn' : ''}`}
                                    key={group.id}
                                >
                                    {group.name}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No categories could be retrieved</p>
                )
            )}


            <div className="form-footer flex gap-3 justify-center w-full mt-auto">
                    <button
                        onClick={(e:any) => handleSubmit(e)}
                        className="button-intellij !p-4 button-confirm !w-1/2"
                        disabled={disabledButton}>
                        Create
                    </button>
            </div>

        </form>
    )

}