import {SearchBar} from "../MiscComponents/SearchBar.tsx";
import {useState} from "react";
import '../../styles/LogPage/CategorySelection.css'

type CategoryHeaderProps = {
    search?: boolean;
    header: string;
    setUI: (value: boolean) => void;
    arrow?: boolean;
}


export const MenuHeader = ({search = false, header, arrow = false, setUI}:CategoryHeaderProps) => {

    const [searchString, setSearchString] = useState("");
    const [inputFocus, setInputFocus] = useState(false);

    return (
        <header className="category-selection-header">

            <div className={`category-selection-header__title ${inputFocus ? 'focused' : ''}`}>

                <button
                    onClick={() => setUI(false)}
                    className="category-selection-header__btn error-text transparent-btn">

                    {arrow ? (
                        <svg className={'hover-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                    ) : (
                        <span>Cancel</span>
                    )}

                </button>

                <h1>{header}</h1>

            </div>

            {search && (
                <SearchBar
                    query={searchString}
                    setQuery={setSearchString}
                    setInputFocus={setInputFocus}
                />
            )}

        </header>
    )
}