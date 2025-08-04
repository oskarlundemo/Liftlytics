import {ExerciseCard} from "./ExerciseCard.tsx";
import '../../styles/LogPage/Exercises.css'
import {MenuHeader} from "./MenuHeader.tsx";
import {useLogContext} from "../../contexts/LogContext.tsx";

type ExercisesProps = {
    setExercises: React.Dispatch<React.SetStateAction<any[]>>
};


export const Exercises = ({ setExercises }: ExercisesProps) => {

    const { setShowExerciseMenu, setAddExerciseMenu, selectedExercises, selectedMuscleGroup } = useLogContext();

    return (
        <section className="exercises-container flex-grow h-full">
            <div className="exercises-wrapper flex flex-grow">

                <MenuHeader
                    search={false}
                    setUI={setShowExerciseMenu}
                    header={selectedMuscleGroup.name || 'Undefined'}
                    arrow={true}
                    addExercise={true}
                />

                <div className="flex flex-col gap-1 exercises-sorrund flex-grow">
                {selectedExercises.length === 0 ? (
                    <h3 style={{color: 'var(--color-text-muted)'}} className={'text-xl flex align-middle justify-center my-auto'}>No exercises found for this muscle group</h3>
                ) : (
                    selectedExercises.map((item) => (
                        <ExerciseCard
                            key={item.id}
                            title={item?.exercise.name || 'Unknown Exercise'}
                            onAddExercise={() => {
                                const newEntry = {
                                    id: item.exercise.id,
                                    name: item.exercise.name || 'Unknown Exercise',
                                    sets: [],
                                    localId: crypto.randomUUID()
                                };

                                setExercises(prev => [...prev, newEntry]);
                                setShowExerciseMenu(false);
                                setAddExerciseMenu(false);
                            }}
                        />
                    ))
                )}
                </div>
            </div>
        </section>
    );
};