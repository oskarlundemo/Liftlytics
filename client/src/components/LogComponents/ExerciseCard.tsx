


type ExerciseCardProps = {
    title: string;
    onAddExercise: () => void;
};

export const ExerciseCard = ({ title, onAddExercise }: ExerciseCardProps) => {
    return (
        <div onClick={onAddExercise} className="exercise-card">
            <h3>{title}</h3>
        </div>
    );
};