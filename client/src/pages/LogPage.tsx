import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import '../styles/LogPage/LogPage.css'
import {useEffect} from "react";
import {LogPageHeader} from "../components/LogComponents/LogPageHeader.tsx";


export const LogPage = () => {

    useEffect(() => {

        // Här kommer vi hämta loggarna

    }, [])

    return (
        <main className="log-page-wrapper">

            <LogPageHeader/>
            <NavigationBar/>

        </main>
    )
}