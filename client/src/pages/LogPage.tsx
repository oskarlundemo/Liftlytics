import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import '../styles/LogPage/LogPage.css'
import {LogPageHeader} from "../components/LogComponents/LogPageHeader.tsx";
import {useLogs} from "../hooks/logHook.ts";
import {LogCard} from "../components/LogComponents/LogCard.tsx";


export const LogPage = () => {

    const { data, isPending, isError } = useLogs();

    console.log(data);


    return (
        <main className="log-page-wrapper">
            <LogPageHeader/>

            {isPending ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Oops, something went wrong!</p>
            ) : data && data.logs && data.logs.length > 0 ? (
                data.logs.map((log, index) => (
                    <LogCard
                        key={index}
                        startTime={log.startTime}
                        workoutName={log.name}
                        exercises={log.exercises || ['Oskar', ['Janne']]}
                    />
                ))
            ) : (
                <p>No logs yet, create one!</p>
            )}

            <NavigationBar/>
        </main>
    )
}