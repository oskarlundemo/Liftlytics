import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import {useAuth} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";


export const ProfilePage = () => {

    const {logout} = useAuth();

    return (
        <main className="profile-page">
            <h1>Profile</h1>

            <button onClick={() => {
                logout();
            }}>Log out</button>

            <NavigationBar/>
        </main>
    )
}