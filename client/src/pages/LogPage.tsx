import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import '../styles/LogPage/LogPage.css'
import {LogPageHeader} from "../components/LogComponents/LogPageHeader.tsx";


export const LogPage = () => {

    return (
        <main className="log-page-wrapper">
            <LogPageHeader/>
            <NavigationBar/>
        </main>
    )
}