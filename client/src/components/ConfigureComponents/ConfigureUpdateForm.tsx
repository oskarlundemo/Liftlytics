import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useEffect, useState} from "react";
import {useUpdateCustomExercise} from "../../hooks/exerciseHook.ts";


type ExerciseFormProps = {
    selectedItem: object
    setShowMenu: (showMenu: boolean) => void
    setCustomData: (data: any[]) => void
    muscleGroups: any
    setShowPopUp: (showPopUp: boolean) => void
}


export const ConfigureUpdateForm = ({selectedItem,  setShowMenu, setCustomData, muscleGroups, setShowPopUp}:ExerciseFormProps) => {

    const [exerciseName, setExerciseName] = useState<string>(selectedItem.name);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const [maxLength, setMaxLength ] = useState<number>(0);
    const { mutate: updateExercise } = useUpdateCustomExercise(setCustomData);
    const [originalName, setOriginalName] = useState<string>(selectedItem.name);
    const [originalCategoryId, setOriginalCategoryId] = useState<string>();

    const defaultCategoryId = selectedItem?.muscleGroups?.[0]?.muscleGroup?.id ?? '';
    const [categoryId, setCategoryId] = useState<string>(defaultCategoryId);

    useEffect(() => {
        const nameUnchanged = originalName === exerciseName.trim();
        const categoryUnchanged = originalCategoryId === categoryId;
        const nameTooLong = exerciseName.length > 100 || exerciseName.trim().length === 0;

        setDisabledButton((nameUnchanged && categoryUnchanged) || nameTooLong);
    }, [exerciseName, categoryId, originalName, originalCategoryId]);


    useEffect(() => {
        const fallbackId = selectedItem?.muscleGroups?.[0]?.muscleGroup?.id ?? '';
        setCategoryId(fallbackId);
        setOriginalCategoryId(fallbackId);
    }, [selectedItem]);


    useEffect(() => {
        setMaxLength(exerciseName.length);
    }, [exerciseName]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateExercise({
            id: selectedItem.id,
            categoryId,
            exercise: selectedItem,
            updatedName: exerciseName,
        });
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
        <form className={'exercise-form flex h-full flex-grow flex-col p-4'} onSubmit={handleSubmit}>

            <div className="form-header flex-row flex justify-end">
                <svg onClick={() => setShowMenu(false)} className={'error-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>

            <h1 className="font-bold text-3xl break-all">
                {exerciseName || <span className="opacity-0">Placeholder</span>}
            </h1>

            <div className="mb-auto">
                <CustomInput
                    type="text"
                    isRequired={false}
                    value={exerciseName}
                    setState={setExerciseName}
                    name={exerciseName}
                    placeholder={selectedItem.name}
                    example={'Name'}
                    keyDownAction={(e) => handleKeyDown(e)}
                />

                <h4
                    style={{ color: maxLength >= 100 ? 'var(--color-error)' : 'var(--color-text-muted)', transition: 'var(--transition-fast)' }}
                    className={`flex justify-end ${maxLength >= 100 ? 'text-2xl' : 'text-xl'}`}
                >
                    {maxLength} / 100
                </h4>
            </div>


            {muscleGroups && (
                muscleGroups.length > 0 ? (
                    <>
                        <h2 className="font-semibold text-xl mb-4">Muscle group</h2>
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


            <div className="form-footer flex gap-3 justify-center w-full p-5">
                <button
                    onClick={(e) => handleSubmit(e)}
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
                    {muscleGroups ? (
                        <span className={'whitespace-nowrap'}>Delete this exercise</span>
                    ) : (
                        <span className={'whitespace-nowrap'}>Delete this muscle group</span>
                        )}
                </button>
            </div>

        </form>
    )

}