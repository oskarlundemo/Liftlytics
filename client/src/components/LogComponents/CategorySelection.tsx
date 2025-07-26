import {CategoryCard} from "./CategoryCard.tsx";
import '../../styles/LogPage/CategorySelection.css'
import {MenuHeader} from "./MenuHeader.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {useFetchExercises, useLogs} from "../../hooks/logHook.ts";
import {useEffect} from "react";
import { PulseLoader } from "react-spinners";



export const CategorySelection = ({}) => {

    const {setAddExerciseMenu} = useLog();
    const {data, isLoading, isError } = useFetchExercises();

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
                        <div className="loader-wrapper">
                            <PulseLoader
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                color="var(--color-accent)"
                            />
                        </div>
                    ) : isError ? (
                        <p className="error-text">Failed to load muscle groups. Please try again later.</p>
                    ) : data?.muscleGroups?.length === 0 ? (
                        <p className="text-gray-500 text-sm">No muscle groups available.</p>
                    ) : (
                        data.muscleGroups.map((muscleGroup) => (
                            <CategoryCard
                                key={muscleGroup.id}
                                title={muscleGroup.name || ''}
                                exercises={muscleGroup.exercises}
                            />
                        ))
                    )}

                </article>
            </div>
        </section>
    );
}