import {PulseLoader} from "react-spinners";

type LoadingResultProps = {
    size: number
}

export const LoadingResults = ({size = 20,}:LoadingResultProps) => {

    return (
        <div style={{margin: '2rem 0'}} className="loader-wrapper">
            <PulseLoader
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
                color="var(--color-accent)"
            />
        </div>
    )
}