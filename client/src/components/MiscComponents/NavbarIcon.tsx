import {useNavigate} from "react-router-dom";
import '../../styles/MiscStyles/Navigation.css'


type NavbarProps = {
    svg: any
    redirect: string
    subTitle: string
    isActive: boolean
}


export const NavbarIcon = ({redirect, svg, subTitle, isActive}:NavbarProps) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => {
            navigate(redirect);
        }} className={`navbar-icon ${isActive ? 'active' : ''}`}>
            {svg}
            <h3>{subTitle}</h3>
        </div>
    )
}