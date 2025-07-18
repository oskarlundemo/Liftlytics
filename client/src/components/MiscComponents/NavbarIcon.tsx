import {useNavigate} from "react-router-dom";
import '../../styles/MiscStyles/Navigation.css'


type NavbarProps = {
    svg: any
    redirect: string
    subTitle: string
}


export const NavbarIcon = ({redirect, svg, subTitle}:NavbarProps) => {

    const navigate = useNavigate();

    return (
        <div onClick={() => {
            navigate(redirect);
        }} className="navbar-icon">
            {svg}
            <h3>{subTitle}</h3>
        </div>
    )

}