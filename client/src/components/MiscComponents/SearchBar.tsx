import '../../styles/MiscStyles/SearchBar.css'


type SearchBarProps = {
    query: string
    setQuery: (query: string) => void
    setInputFocus?: (value: boolean) => void;
    placeholder?: string
    clear?: () => void;
}



export const SearchBar = ({query, setQuery, placeholder, clear, setInputFocus}: SearchBarProps) => {

    return (
        <div className="search-bar-wrapper flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>

            <input
                type="text"
                className="search-input"
                placeholder={placeholder || 'Search...'}
                value={query}
                onFocus={() => setInputFocus?.(true)}
                onBlur={() => setInputFocus?.(false)}
                onChange={(e) => setQuery(e.target.value)}
            />

            {clear && (
                <span onClick={clear} style={{color: 'var(--color-text-muted)'}} className={'hover-text flex justify-center m-auto'}>Clear</span>
            )}
        </div>
    )
}