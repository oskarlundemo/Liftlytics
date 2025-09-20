import '../../styles/MiscStyles/DropDown.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";


type DropDownCardProps = {
    list?: any
    title: string
    singleElement?: React.ReactNode
    arrow?: boolean
}


export const DropDownCard = ({list, title, arrow, singleElement}:DropDownCardProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [numberOfExercises, setNumberOfExercises] = useState<number>(list?.length || []);
    const toggleDropdown = () => setIsOpen(prev => !prev);
    const navigate = useNavigate();

    return (
        <div className="card-container">


            <div className={'drop-down-header justify-between flex flex-row gap-5'}>

                <h3 onClick={toggleDropdown} className="dropdown-title flex gap-1">
                    {title}
                    {list && (
                        <span>({numberOfExercises})</span>
                    )}
                </h3>

                {arrow && (
                    <svg className={`drop-down-icon ${isOpen ? 'rotate-icon' : ''}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m280-400 200-200 200 200H280Z"/></svg>
                )}

            </div>


            <div className={`sub-menu ${isOpen ? 'show' : ''}`}>
                <div className="sub-menu-inner">

                    {list && (
                        (list.map((item:any, i:number) => (
                                <div onClick={() => navigate(`./${encodeURI(item.exercise.name)}/${encodeURI(item.exercise.id)}`)} key={i} className="exercise-card">
                                    <h4>{item.exercise?.name || 'Unnamed'}</h4>
                                </div>
                            )))
                    )}

                    {singleElement && (
                        singleElement
                    )}

                </div>
            </div>
        </div>
    )
}