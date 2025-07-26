import '../../styles/LogPage/Exercises.css'
import {ExerciseModuleHeader} from "./ExerciseModuleHeader.tsx";
import {ExerciseDataRow} from "./ExerciseDataRow.tsx";
import {ExerciseModuleFooter} from "./ExerciseModuleFooter.tsx";
import { v4 as uuidv4 } from 'uuid';


type ExerciseSet = {
    id: string;
    reps?: number;
    weight?: number;
    notes?: string;
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
        const newSet: ExerciseSet = {
            id: uuidv4(),
            reps: undefined,
            weight: undefined,
            notes: ''
        };

        updateSets(localId, [...(sets || []), newSet]);
    };

    const removeSet = (setId: string) => {
        updateSets(localId, sets.filter(s => s.id !== setId));
    };

    return (
        <div className="exercise-module">

            <ExerciseModuleHeader localId={localId} deleteExercise={deleteExercise} title={title} />

            {(sets).map((set, index) => (
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
                        updateSets(localId, updatedSets);
                    }}
                    removeSet={() => removeSet(set.id)}
                />
            ))}

            <ExerciseModuleFooter addSet={addSet} />
        </div>
    );
};