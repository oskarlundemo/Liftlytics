import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import '../styles/LogPage/LogPage.css'
import {LogPageHeader} from "../components/LogComponents/LogPageHeader.tsx";
import {useState} from "react";


export const LogPage = () => {

    const [logs, setLogs] = useState<any>([]);

    return (
        <main className="log-page-wrapper">
            <LogPageHeader/>

            {logs.length > 0 ? (
                <h2>Logs</h2>
            ) : (
                <h2>No logs yet, create one!</h2>
            )}

            <NavigationBar/>
        </main>
    )
}