import {ExerciseModule} from "./ExerciseModule.tsx";
import {useLogContext} from "../../contexts/LogContext.tsx";
import {useEffect} from "react";

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


    const {setIsEditing} = useLogContext()

    const updateSets = (exerciseLocalId: string, newSets: ExerciseSet[]) => {
        setExercises(prev =>
            prev.map(ex =>
                ex.localId === exerciseLocalId
                    ? { ...ex, sets: newSets }
                    : ex
            )
        );
    };

    useEffect(() => {
        if (exercises.length == 0)
            setIsEditing(false)
    }, [exercises]);


    const deleteExercise = (id: string) => {
        setExercises(prev => prev.filter(x => x.localId !== id));
    }

    return (
            <section className="exercise-selection-wrapper">
                {exercises.map((exercise, index) => {
                  return (
                      <ExerciseModule
                          exercises={exercises}
                          setExercises={setExercises}
                          deleteExercise={deleteExercise}
                          localId={exercise.localId}
                          key={index}
                          index={index}
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