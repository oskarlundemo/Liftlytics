import {CategoryCard} from "./CategoryCard.tsx";
import '../../styles/LogPage/CategorySelection.css'
import {MenuHeader} from "./MenuHeader.tsx";
import {useLog} from "../../contexts/LogContext.tsx";
import {useFetchExercises, useSearchExercises} from "../../hooks/logHook.ts";
import { PulseLoader } from "react-spinners";
import {useEffect, useState} from "react";
import { useDebounce } from 'use-debounce';
import {ExerciseCard} from "./ExerciseCard.tsx";



export const CategorySelection = ({}) => {

    const {setAddExerciseMenu} = useLog();
    const {data, isLoading, isError } = useFetchExercises();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedQuery] = useDebounce(searchQuery, 400);
    const { data: searchResults, isLoading: isSearchLoading } = useSearchExercises(debouncedQuery);
    const [showSearchResults, setShowSearchResults] = useState<boolean>(true);


    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);

    useEffect(() => {
        setShowSearchResults(searchQuery.trim().length > 0);
    }, [searchQuery]);

    return (
        <section className="category-selection-container">
            <div className="category-wrapper">
                <MenuHeader
                    search={true}
                    setUI={setAddExerciseMenu}
                    header={'Select muscle group'}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
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
                        <p>No muscle groups available.</p>
                    ) : (
                        showSearchResults ? (
                            searchResults?.results && searchResults.results.length > 0 ? (
                                searchResults.results.map((item, index) => (
                                    <ExerciseCard title = {item.name} key={item.id} onAddExercise={() => console.log('oksar')} />
                                ))
                            ) : (
                                <p>No exercises found for your search.</p>
                            )
                        ) : (
                            data.muscleGroups.map((muscleGroup: any) => (
                                <CategoryCard
                                    key={muscleGroup.id}
                                    title={muscleGroup.name || ''}
                                    exercises={muscleGroup.exercises}
                                />
                            ))
                        )
                    )}
                </article>

            </div>
        </section>
    );
}