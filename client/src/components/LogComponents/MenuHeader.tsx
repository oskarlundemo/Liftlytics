import {SearchBar} from "../MiscComponents/SearchBar.tsx";
import {useState} from "react";
import '../../styles/LogPage/CategorySelection.css'
import {useLogContext} from "../../contexts/LogContext.tsx";

type CategoryHeaderProps = {
    search?: boolean;
    header: string;
    setUI: (value: boolean) => void;
    arrow?: boolean;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    addExercise?: boolean;
    arrowRight?: boolean;
}


export const MenuHeader = ({search = false,
                                                            header,
                                                            searchQuery = '',
                                                            setSearchQuery = () => {},
                                                            arrow = false,
                                                            arrowRight = false,
                                                            addExercise = false,
                                                            setUI}:CategoryHeaderProps) => {

    const [inputFocus, setInputFocus] = useState(false);
    const { setShowCustomExerciseMenu } = useLogContext();

    return (
        <header className={`category-selection-header`}>

            <div className={`category-selection-header__title ${inputFocus ? 'focused' : ''}`}>

                <button
                    onClick={() => setUI(false)}
                    type="button"

                    style={{
                        gridArea: arrowRight ? '1 / 3 / 2 / 4' : '1 / 1 / 2 / 2',
                        justifySelf: arrowRight ? 'end' : 'start',
                        alignSelf: 'center'
                    }}

                    className={`category-selection-header__btn error-text transparent-btn`}>

                    {arrow ? (
                        (arrowRight ? (
                            <svg className={`hover-svg`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                        ) : (
                            <svg className={`hover-svg`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                        ))
                    ) : (
                        <span
                            className={`subtle-grey-button !hover-text`}
                            style={{
                                alignSelf: 'center',
                                justifySelf: 'center',
                            }}
                            type="button"
                            onClick={() => {
                                setShowCustomExerciseMenu(false);
                            }}
                        >
                            Cancel
                        </span>
                    )}

                </button>

                <h1 className={'text-2xl font-bold m-4'}>{header}</h1>

                {addExercise && (
                    <button
                        className={`subtle-grey-button hover-text`}
                        style={{
                            alignSelf: 'center',
                            justifySelf: 'center',
                        }}
                        type="button"
                        onClick={() => {
                            setShowCustomExerciseMenu(true);
                        }}
                    >
                        Add exercise
                    </button>
                )}

            </div>

            {search && (
                <SearchBar
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    setInputFocus={setInputFocus}
                />
            )}
        </header>
    )
}