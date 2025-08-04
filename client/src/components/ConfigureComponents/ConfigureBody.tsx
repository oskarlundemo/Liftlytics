import {useEffect, useState} from "react";
import {SearchBar} from "../MiscComponents/SearchBar.tsx";
import {CustomConfigureCard} from "../ProfileComponents/CustomConfigureCard.tsx";


type ExerciseBodyProps = {
    customData: any;
    title: string
    setSelectedItem: (item: any) => void;
    setShowMenu: (showCreateMenu: boolean) => void;
}


export const ConfigureBody = ({customData, title, setSelectedItem, setShowMenu}: ExerciseBodyProps) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredResults, setFilteredResults] = useState<any>([])

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredResults([]);
            return;
        }

        const filtered = customData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredResults(filtered);
    }, [searchQuery, customData]);

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
                    filteredResults.map((item, index) => (
                        <CustomConfigureCard
                            item={item || null}
                            key={item.id || index }
                            name={item.name || 'Undefined'}
                            setSelectedItem={setSelectedItem}
                            setShowMenu={setShowMenu}
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
            ) : customData.length > 0 ? (
                customData.map((item, index) => (
                    <CustomConfigureCard
                        item={item || null}
                        key={item.id || index }
                        name={item.name || 'Undefined'}
                        setSelectedItem={setSelectedItem}
                        setShowMenu={setShowMenu}
                    />
                ))
            ) : (
                <h2
                    style={{ color: "var(--color-text-muted)" }}
                    className="text-2xl m-auto"
                >
                    {title}
                </h2>
            )}
        </section>
    );

}