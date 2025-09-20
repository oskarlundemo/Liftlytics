import {RowInput} from "./RowInput.tsx";
import '../../styles/LogPage/Exercises.css'


type ExerciseDataRowProps = {
    index: number;
    setId: string;
    reps?: number;
    weight?: number;
    notes?: string;
    onChange: (reps: number | null, weight: number | null, notes: string) => void;
    duplicate?: void;
    removeSet: (id: number) => void;
};

export const ExerciseDataRow = ({
                                    setId,
                                    index,
                                    reps,
                                    weight,
                                    notes,
                                    onChange,
                                    removeSet,
                                    duplicate,
                                }: ExerciseDataRowProps) => {
    return (
        <div className="exercise-row">

            <h4 className={'index-row font-semibold text-base'}>{index}</h4>


            <div className="repeat-icon flex flex-row gap-2">
                <svg onClick={() => duplicate()} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
            </div>

            <RowInput
                title={'Kg'}
                inputState={weight !== null && weight !== undefined ? weight.toString() : ''}
                setInputState={(value) => {
                    const newWeight = value === '' ? null : Number(value);
                    onChange(reps ?? null, newWeight, notes ?? '');
                }}
                inputType={'number'}
                placeholder={'0'}
            />

            <RowInput
                title={'Reps'}
                inputState={reps !== null && reps !== undefined ? reps.toString() : ''}
                setInputState={(value) => {
                    const newReps = value === '' ? null : Number(value);
                    onChange(newReps, weight ?? null, notes ?? '');
                }}
                inputType={'number'}
                placeholder={'0'}
            />

            <RowInput
                title={'Notes'}
                inputState={notes ?? ''}
                setInputState={(value) => onChange(reps ?? null, weight ?? null, value)}
                inputType={'text'}
            />


            <div className="remove-set flex flex-row gap-2">
                <svg onClick={() => removeSet(setId)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </div>

        </div>
    );
};