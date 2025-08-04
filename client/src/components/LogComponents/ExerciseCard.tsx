


type ExerciseCardProps = {
    title: string;
    onAddExercise: () => void;
};

export const ExerciseCard = ({ title, onAddExercise }: ExerciseCardProps) => {
    return (
        <div
            style={{
                backgroundColor: 'var(--color-surface)',
                padding: '1rem',
            }}
            onClick={onAddExercise} className="exercise-card left-adjust">
            <h3 className={'text-xl font-semibold'}>{title}</h3>
        </div>
    );
};