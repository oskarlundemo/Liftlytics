import '../../styles/Workout/NewWorkout.css'


type BodyWeightProps = {
    weight?: number | null;
    setWeight?: (weight: number) => void;
}


export const BodyWeight = ({weight, setWeight}: BodyWeightProps) => {


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




    return (
        <section
            className="body-weight-wrapper">

            <h2 className={'text-xl font-bold'}>Body weight</h2>

            <input
                type="number"
                min={0}
                max={Number(weight) < 1000 ? 1000 : undefined}
                step="0.1"
                placeholder="Enter weight (kg)"
                value={weight ?? ''}
                onChange={handleChange}
            />

            <h3>kg</h3>

        </section>
    )
}