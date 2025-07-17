import {useAuth} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";


export const Home = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <main className="home-container">
            <h1>You have logged in</h1>

            <button onClick={handleLogout}>Logout</button>
        </main>
    )
}