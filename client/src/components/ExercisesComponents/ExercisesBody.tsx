import {useEffect, useState} from "react";
import {SearchBar} from "../MiscComponents/SearchBar.tsx";
import {useExerciseContext} from "../../contexts/ExerciseContext.tsx";
import {CustomExerciseCard} from "../ProfileComponents/CustomExerciseCard.tsx";

export const ExercisesBody = ({}) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredResults, setFilteredResults] = useState<any>([])
    const {customExercises} = useExerciseContext();

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredResults([]);
            return;
        }

        const filtered = customExercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredResults(filtered);
    }, [searchQuery, customExercises]);

    const handleClear = () => {
        setSearchQuery("");
        setFilteredResults([]);
    };

    return (
        <section className="w-full h-full flex flex-col">
            <SearchBar
                query={searchQuery}
                setQuery={setSearchQuery}
                placeholder="Search for an exercise..."
                clear={() => handleClear()}
            />

            {searchQuery.trim() !== "" ? (
                filteredResults.length > 0 ? (
                    filteredResults.map((exercise, index) => (
                        <CustomExerciseCard
                            exercise={exercise}
                            key={exercise.id ?? index}
                            name={exercise.name}
                        />
                    ))
                ) : (
                    <h2
                        style={{ color: "var(--color-text-muted)" }}
                        className="text-2xl m-auto"
                    >
                        No results found
                    </h2>
                )
            ) : customExercises.length > 0 ? (
                customExercises.map((exercise) => (
                    <CustomExerciseCard
                        exercise={exercise}
                        key={exercise.id}
                        name={exercise.name}
                    />
                ))
            ) : (
                <h2
                    style={{ color: "var(--color-text-muted)" }}
                    className="text-2xl m-auto"
                >
                    You have not created any custom exercises
                </h2>
            )}
        </section>
    );

}