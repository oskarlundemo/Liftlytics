import '../../styles/Workout/NewWorkout.css'
import {useEffect, useState} from "react";


type BodyWeightProps = {
    weight?: number | null;
    setWeight?: (weight: number) => void;
}


export const BodyWeight = ({weight, setWeight}: BodyWeightProps) => {

    const [chars, setChars] = useState<number[]>([]);

    useEffect(() => {
        setChars(weight?.toString().length || 0)
    }, [weight])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            setWeight(null);
        } else {
            const num = Number(value.replace(",", "."));
            if (!isNaN(num) && num > 0) {
                setWeight(num);
            } else {
                setWeight(null);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            weight?.toString().length >= 5 &&
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)
        ) {
            e.preventDefault();
        }
    }


    return (
        <section
            className="body-weight-wrapper">

            <h2 className={'text-xl font-bold'}>Body weight</h2>


            <h4
                style={{ color: chars > 5 ? 'var(--color-error)' : 'var(--color-text-muted)', transition: 'var(--transition-fast)' }}
                className={`flex justify-end ${chars > 5 ? 'text-xl' : 'text-base'}`}
            >
                {chars} / {5}
            </h4>

            <input
                type="number"
                min={0}
                max={Number(weight) < 1000 ? 1000 : undefined}
                step="0.1"
                placeholder="Enter weight (kg)"
                value={weight ?? ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            <h3>kg</h3>

        </section>
    )
}