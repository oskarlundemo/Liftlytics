import '../../styles/LogPage/Exercises.css'
import {ExerciseModuleHeader} from "./ExerciseModuleHeader.tsx";
import {ExerciseDataRow} from "./ExerciseDataRow.tsx";
import {ExerciseModuleFooter} from "./ExerciseModuleFooter.tsx";

type ExerciseSet = {
    id: number;
    reps?: number;
    weight?: number;
};

type ExerciseModuleProps = {
    id: string;
    title: string;
    sets: ExerciseSet[];
    updateSets: (exerciseId: string, sets: ExerciseSet[]) => void;
    deleteExercise: (exerciseId: string) => void;
    localId: string;
};

export const ExerciseModule = ({id, title, sets, localId, updateSets, deleteExercise}: ExerciseModuleProps) => {

    const addSet = () => {
        const newId = sets && sets.length > 0
            ? Math.max(...sets.map(s => s.id)) + 1
            : 1;

        updateSets(id, [...(sets || []), { id: newId }]);
    };

    const removeSet = (setId: number) => {
        updateSets(id, sets.filter(s => s.id !== setId));
    };

    return (
        <div className="exercise-module">

            <ExerciseModuleHeader localId={localId} deleteExercise={deleteExercise} title={title} />

            {(sets || []).map((set, index) => (
                <ExerciseDataRow
                    key={set.id}
                    index={index + 1}
                    setId={set.id}
                    reps={set.reps}
                    weight={set.weight}
                    notes={set.notes}
                    onChange={(reps, weight, notes) => {
                        const updatedSets = sets.map(s =>
                            s.id === set.id ? { ...s, reps, weight, notes } : s
                        );
                        updateSets(id, updatedSets);
                    }}
                    removeSet={() => removeSet(set.id)}
                />
            ))}

            <ExerciseModuleFooter addSet={addSet} />
        </div>
    );
};