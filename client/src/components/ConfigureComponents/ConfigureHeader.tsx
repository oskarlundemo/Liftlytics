import {useNavigate} from "react-router-dom";

type ExercisesHeaderProps = {
    title: string
}


export const ConfigureHeader = ({title}:ExercisesHeaderProps) => {


    const navigate = useNavigate();

    return (
        <header className={'w-full flex flex-row relative p-4'}>

            <svg onClick={() => navigate('/profile')} className={'hover-svg m-4 align-middle'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>

            <h1 className="text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                {title}
            </h1>
        </header>
    )
}