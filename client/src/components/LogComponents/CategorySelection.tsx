import {CategoryCard} from "./CategoryCard.tsx";
import '../../styles/LogPage/CategorySelection.css'
import {MenuHeader} from "./MenuHeader.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {useLogs} from "../../hooks/logHook.ts";
import {useEffect} from "react";
import { PulseLoader } from "react-spinners";



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
                        <PulseLoader
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        data.muscleGroups.map((muscleGroup) => (
                            <CategoryCard
                                exercises={muscleGroup.exercises}
                                key={muscleGroup.id}
                                title={muscleGroup.name || ''}/>
                        ))
                    )}

                </article>

            </div>

        </section>
    )
}