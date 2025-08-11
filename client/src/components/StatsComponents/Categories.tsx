import {useEffect, useState} from 'react'
import {SearchBar} from '../MiscComponents/SearchBar.tsx'
import {useStatsContext} from "../../contexts/StatsContext.tsx";
import {DropDownMenu} from "../MiscComponents/DropDownMenu.tsx";
import {DropDownCard} from "../MiscComponents/DropDownCard.tsx";
import {useSearchExercises} from "../../hooks/logHook.ts";
import {useDebounce} from "use-debounce";
import {LoadingResults} from "../MiscComponents/LoadingResults.tsx";
import {ExerciseResultsCard} from "./ExerciseResultsCard.tsx";





export const Categories = ({}) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const {categories} = useStatsContext();
    const [debouncedQuery] = useDebounce(searchTerm, 400);
    const { data: searchResults, isPending: isSearchPending, isLoading, isError } = useSearchExercises(debouncedQuery);
    const [showSearchResults, setShowSearchResults] = useState<boolean>(true);

    useEffect(() => {
        setShowSearchResults(searchTerm.trim().length > 0);
    }, [searchTerm]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <section className="muscle-group">

            <h2 className="title">Categories</h2>

            <form className={'categories-form'} onSubmit={handleSubmit}>

                <SearchBar
                    query={searchTerm}
                    setQuery={setSearchTerm}
                    placeholder={'Search for a exercise...'}
                />

            </form>


            {isSearchPending && showSearchResults ? (
                <LoadingResults size={20} />
            ) : showSearchResults ? (
                isError ? (
                    <h4 style={{ textAlign: 'center', color: 'var(--color-error)', marginTop: '1rem' }}>
                        An error occurred while retrieving your search results.
                    </h4>
                ) : searchResults?.results?.length > 0 ? (
                    searchResults.results.map((item, index) => (
                        <ExerciseResultsCard name={item.name} id={item.id}/>
                    ))
                ) : (
                    <h4 style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                        No exercises matched that search.
                    </h4>
                )
            ) : categories.length > 0 ? (
                categories.map((category, index) => (
                    <DropDownMenu key={category.id || index}>
                        <DropDownCard
                            title={category.name}
                            list={category.exercises}
                        />
                    </DropDownMenu>
                ))
            ) : (
                <h4>No categories found.</h4>
            )}
        </section>
    )
}