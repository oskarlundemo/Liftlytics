import {ExerciseModule} from "./ExerciseModule.tsx";

type ExerciseSelectionProps = {
    setExercises: React.Dispatch<React.SetStateAction<any[]>>
    exercises: Array<any>
};

type ExerciseSet = {
    id: number;
    reps?: number;
    weight?: number;
};


export const ExerciseSelection = ({exercises, setExercises}: ExerciseSelectionProps) => {

    const updateSets = (exerciseLocalId: string, newSets: ExerciseSet[]) => {
        setExercises(prev =>
            prev.map(ex =>
                ex.localId === exerciseLocalId
                    ? { ...ex, sets: newSets }
                    : ex
            )
        );
    };
    const deleteExercise = (id: string) => {
        setExercises(prev => prev.filter(x => x.localId !== id));
    }

    return (
            <section className="exercise-selection-wrapper">
                {exercises.map((exercise, index) => {
                    console.log(exercise);
                  return (
                      <ExerciseModule
                          deleteExercise={deleteExercise}
                          localId={exercise.localId}
                          key={index}
                          id={exercise.id}
                          title={exercise?.name || 'Unknown Exercise'}
                          sets={exercise.sets}
                          updateSets={updateSets}
                    />
                );
            })}
            </section>
    );
};