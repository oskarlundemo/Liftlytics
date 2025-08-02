import {useNavigate} from "react-router-dom";


type ExerciseResultsProps = {
    id: string
    name: string
}

export const ExerciseResultsCard = ({id, name}:ExerciseResultsProps) => {

    const navigate = useNavigate();

    return (
        <article className={'exercise-card'} style={{height: 'fit-conent'}} key={id}>
           <h3>{name}</h3>
        </article>
    )
}