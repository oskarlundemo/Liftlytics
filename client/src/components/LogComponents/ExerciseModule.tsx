import '../../styles/LogPage/Exercises.css'
import {ExerciseModuleHeader} from "./ExerciseModuleHeader.tsx";
import {ExerciseDataRow} from "./ExerciseDataRow.tsx";
import {ExerciseModuleFooter} from "./ExerciseModuleFooter.tsx";
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";
import {useLogContext} from "../../contexts/LogContext.tsx";


type ExerciseSet = {
    id: string;
    reps?: number;
    weight?: number;
    notes?: string;
};

type ExerciseModuleProps = {
    setExercises: React.Dispatch<React.SetStateAction<any[]>>
    index: number;
    exercises: Array<any>
    id?: string;
    title: string;
    sets: ExerciseSet[];
    updateSets: any;
    deleteExercise: (exerciseId: string) => void;
    localId: string;
};

export const ExerciseModule = ({title, sets, localId, updateSets, exercises, index, setExercises, deleteExercise}: ExerciseModuleProps) => {

    const {isEditing} = useLogContext();

    const addSet = () => {
        const newSet: ExerciseSet = {
            id: uuidv4(),
            reps: undefined,
            weight: undefined,
            notes: ''
        };

        updateSets(localId, [...(sets || []), newSet]);
    };

    const duplicateSets = (set:any) => {

        const duplicatedSet: ExerciseSet = {
            id: uuidv4(),
            reps: set.set.reps || undefined,
            weight: set.set.weight || undefined,
            notes: set.set.notes || ''
        }

        const updatedSets = [...(sets || [])];

        updatedSets.splice(set.index + 1, 0, duplicatedSet);

        updateSets(localId, updatedSets);
    }

    const removeSet = (setId: string | number) => {
        updateSets(localId, sets.filter(s => s.id !== setId));
    };


    const moveExerciseUp = (index: number) => {

        if (index <= 0) return;

        const newExercises = [...exercises];

        [newExercises[index - 1], newExercises[index]] =
            [newExercises[index], newExercises[index - 1]];

        setExercises(newExercises);
    };


    const moveExerciseDown = (index: number) => {
        if (index >= exercises.length - 1) return;

        const newExercises = [...exercises];

        [newExercises[index], newExercises[index + 1]] =
            [newExercises[index + 1], newExercises[index]];

        setExercises(newExercises);
    };

    useEffect(() => {
        if (sets.length === 0) {
            deleteExercise(localId);
        }
    }, [sets])


    return (
        <div className={`exercise-module-wrapper`}>

            <div className={`delete-header ${isEditing ? 'grow-delete' : ''}`}>
                {isEditing && (
                    <svg className={'remove-svg'} onClick={() => deleteExercise(localId)}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-440v-80h560v80H200Z"/></svg>
                )}
            </div>


            <div className={`exercise-module-data`}>

                    <div className={`order-controller ${isEditing ? 'stretch-controller' : ''}`}>

                        {isEditing && (
                            <>

                                {index > 0 && (
                                    <svg
                                        onClick={() => moveExerciseUp(index)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#e3e3e3"
                                    >
                                        <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
                                    </svg>
                                )}


                                {index < exercises.length - 1 && (
                                    <svg
                                        onClick={() => moveExerciseDown(index)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#e3e3e3"
                                    >
                                        <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/>
                                    </svg>
                                )}

                            </>
                        )}

                    </div>

                <div className={`exercise-module ${isEditing ? 'editing' : ''}`}>

                    <ExerciseModuleHeader title={title} />

                    {(sets).map((set, index) => (
                        <ExerciseDataRow
                            key={set.id}
                            index={index + 1}
                            reps={set.reps}
                            weight={set.weight}
                            notes={set.notes}
                            onChange={(reps, weight, notes) => {
                                const updatedSets:any = sets.map(s =>
                                    s.id === set.id ? { ...s, reps, weight, notes } : s
                                );
                                updateSets(localId, updatedSets);
                            }}
                            duplicate={() => duplicateSets({set, index})}
                            removeSet={() => removeSet(set.id)}
                        />
                    ))}

                    <ExerciseModuleFooter addSet={addSet} />

                </div>

            </div>

        </div>
    );
};