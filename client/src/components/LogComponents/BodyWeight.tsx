import '../../styles/Workout/NewWorkout.css'


type BodyWeightProps = {
    weight?: number | null;
    setWeight?: (weight: number) => void;
}


export const BodyWeight = ({weight, setWeight}: BodyWeightProps) => {


    return (
        <section
            className="body-weight-wrapper">

            <h2>Body weight</h2>

            <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter weight (kg)"
                value={weight ?? ''}
                onChange={(e) => setWeight(Number(e.target.value))}
            />

            <h3>kg</h3>

        </section>
    )
}