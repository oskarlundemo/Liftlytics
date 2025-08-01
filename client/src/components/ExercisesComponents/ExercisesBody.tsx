import { useState} from "react";
import {SearchBar} from "../MiscComponents/SearchBar.tsx";
import {useExerciseContext} from "../../contexts/ExerciseContext.tsx";
import {CustomExerciseCard} from "../ProfileComponents/CustomExerciseCard.tsx";

export const ExercisesBody = ({}) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const {customExercises} = useExerciseContext();

    return (
        <section className="w-full h-full flex flex-col">
            <SearchBar
                setSearchQuery={setSearchQuery}
                setQuery={searchQuery}
                placeholder="Search for an exercise..."
            />

            {customExercises.length > 0 ? (
                customExercises.map((exercise) => (
                    <CustomExerciseCard exercise={exercise} key={exercise.id} name={exercise.name} />
                ))
            ) : (
                <h2
                    style={{ color: "var(--color-text-muted)" }}
                    className="text-2xl m-auto">
                    You have not created any custom exercises
                </h2>
            )}
        </section>
    );
}