import '../../styles/MiscStyles/DropDown.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";


type DropDownCardProps = {
    list: any
    title: string
    singleElement?: React.ReactNode
}


export const DropDownCard = ({list, title, singleElement}:DropDownCardProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [numberOfExercises, setNumberOfExercises] = useState<number>(list?.length || []);
    const toggleDropdown = () => setIsOpen(prev => !prev);
    const navigate = useNavigate();

    return (
        <div className="card-container">

            <h3 onClick={toggleDropdown} className="dropdown-title">
                {title}

                {list && (
                    <span>({numberOfExercises})</span>
                )}
            </h3>

            <div className={`sub-menu ${isOpen ? 'show' : ''}`}>
                <div className="sub-menu-inner">

                    {list && (
                        (list.map((item, i) => (
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