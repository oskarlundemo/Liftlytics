import {useNavigate} from "react-router-dom";


type ExerciseResultsProps = {
    id: string
    name: string
}

export const ExerciseResultsCard = ({id, name}:ExerciseResultsProps) => {

    const navigate = useNavigate();

    return (
        <article onClick={() => navigate(`./${encodeURI(name)}/${encodeURI(id)}`)} className={'w-full my-5'}>
            <div className='exercise-card'>
                <h4 className={'text-xl font-light'}>{name}</h4>
            </div>
        </article>
    )
}