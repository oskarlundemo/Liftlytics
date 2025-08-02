import {useNavigate} from "react-router-dom";


type ModuleRowProps = {
    title: string,
    svg: any
    path: string;
}


export const ModuleRow = ({title, svg, path}:ModuleRowProps) => {

    const navigate = useNavigate();

    return (
        <div  onClick={() => navigate(path)} className="module-row w-full gap-1 items-center flex flex-row">
            {svg}
            <h2>{title}</h2>
        </div>
    )
}