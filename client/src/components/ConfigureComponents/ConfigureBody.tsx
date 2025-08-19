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
        <section className="w-full gap-5 h-full flex flex-col flex-grow">
            <SearchBar
                query={searchQuery}
                setQuery={setSearchQuery}
                placeholder="Search..."
                clear={() => handleClear()}
            />

            <div className="flex card-cols flex-col">
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
                    <div className="flex items-center justify-center flex-grow h-full px-4">
                        <h2
                            style={{ color: "var(--color-text-muted)" }}
                            className="text-2xl bg-transparent text-center break-words my-5 w-full max-w-[600px]"
                        >
                            No results matched "{searchQuery}"
                        </h2>
                    </div>
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
            </div>
        </section>
    );

}