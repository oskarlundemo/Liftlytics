import {RowInput} from "./RowInput.tsx";
import '../../styles/LogPage/Exercises.css'


type ExerciseDataRowProps = {
    index: number;
    setId: string;
    reps?: number;
    weight?: number;
    notes?: string;
    onChange: (reps: number | null, weight: number | null, notes: string) => void;
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
                                }: ExerciseDataRowProps) => {
    return (
        <div className="exercise-row">
            <h4 className={'index-row font-semibold text-base'}>{index}</h4>

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

            <svg className={'error-svg'} onClick={() => removeSet(setId)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
        </div>
    );
};