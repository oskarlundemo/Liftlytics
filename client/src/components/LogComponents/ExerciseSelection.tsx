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


    const updateSets = (exerciseId: string, newSets: ExerciseSet[]) => {
        setExercises(prev =>
            prev.map(ex => ex.id === exerciseId ? {...ex, sets: newSets} : ex)
        );
    };

    const deleteExercise = (id: string) => {
        setExercises(prev => prev.filter(x => x.localId !== id));
    }

    console.log(exercises);

    return (
            <section className="exercise-selection-wrapper">
                {exercises.map((exercise, index) => {
                  return (
                      <ExerciseModule
                          deleteExercise={deleteExercise}
                          localId={exercise.localId}
                          key={index}
                          id={exercise.id}
                          title={exercise.exercise.name}
                          sets={exercise.sets}
                          updateSets={updateSets}
                    />
                );
            })}
            </section>
    );
};