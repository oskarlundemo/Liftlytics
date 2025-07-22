import {CategoryCard} from "./CategoryCard.tsx";
import '../../styles/LogPage/CategorySelection.css'
import {MenuHeader} from "./MenuHeader.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {useLogs} from "../../hooks/useNewWorkout.ts";
import {useEffect} from "react";

export const CategorySelection = ({}) => {

    const {setAddExerciseMenu} = useLog();
    const {data, isLoading } = useLogs();

    useEffect(() => {
        if (data) {
            console.log("Workout data:", data);
        }
    }, [data]);


    return (
        <section className="category-selection-container">

            <div className="category-wrapper">

                <MenuHeader
                    search={true}
                    setUI={setAddExerciseMenu}
                    header={'Select muscle group'}
                />

                <article className="category-selection-body">

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        data.muscleGroups.map((muscleGroup) => (
                            <CategoryCard
                                exercises={muscleGroup.exercises}
                                key={muscleGroup.id}
                                title={muscleGroup.name || ''}/>
                        ))
                    )}

                    <CategoryCard
                        title={'Arms'}
                    />

                </article>

            </div>

        </section>
    )
}