import {ExerciseCard} from "./ExerciseCard.tsx";
import '../../styles/LogPage/Exercises.css'
import {MenuHeader} from "./MenuHeader.tsx";
import {useLog} from "../../contexts/LogContext.tsx";




export const Exercises = ({  }) => {

    const { setShowExerciseMenu, selectedExercises, selectedMuscleGroupName} = useLog();

    return (
        <section className="exercises-container">
            <div className="exercises-wrapper">

                <MenuHeader
                    search={false}
                    setUI={setShowExerciseMenu}
                    header={selectedMuscleGroupName}
                    arrow={true}
                />

                {selectedExercises.length === 0 ? (
                    <p>No exercises found for this muscle group.</p>
                ) : (
                    selectedExercises.map((item) => (
                        <ExerciseCard key={item.id} title={item.exercise.name || 'Unknown Exercise'} />
                    ))
                )}
            </div>
        </section>
    );
};
