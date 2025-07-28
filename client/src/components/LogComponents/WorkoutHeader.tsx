import {useNavigate} from "react-router-dom";


type WorkoutHederProps = {
    date: Date;
}


export const WorkoutHeader = ({date} : WorkoutHederProps) => {

    const navigate = useNavigate();

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
    });

    return (
        <header
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                position: "relative",
            }}
            className="workout-header"
        >
            <svg
                style={{ margin: '1rem' }}
                onClick={() => {navigate(-1)}}
                className="hover-svg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
            >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            <h1
                style={{
                    margin: 0,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                }}
                className="workout-title"
            >
                {formattedDate}
            </h1>
        </header>
    )

}