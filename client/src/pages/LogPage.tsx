import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import '../styles/LogPage/LogPage.css'
import {LogPageHeader} from "../components/LogComponents/LogPageHeader.tsx";
import {useLogs} from "../hooks/logHook.ts";
import {LogCard} from "../components/LogComponents/LogCard.tsx";
import {SlideInBottomMenu} from "../components/MiscComponents/SlideInBottomMenu.tsx";
import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {useLogContext} from "../contexts/LogContext.tsx";
import {DeleteButtonContainer} from "../components/LogComponents/DeleteButtonContainer.tsx";
import {Link} from "react-router-dom";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {useEffect} from "react";


export const LogPage = () => {

    const { data, isPending, isLoading, isError, error } = useLogs();
    const {showDeleteMenu, setShowDeleteMenu} = useLogContext();


    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div className="log-page-container">
            <main className="log-page-wrapper">
                {isLoading ? (
                    <LoadingPage title="Loading your logs" />
                ) : (
                    <>
                        <LogPageHeader />

                        <section className="log-body">
                            {isError ? (
                                <ErrorPage
                                    title="Something went wrong"
                                    errorMessage={error.message}
                                    details={error.code}
                                />
                            ) : data.logs.length > 0 ? (
                                data.logs.map((log, index) => (
                                    <LogCard
                                        key={index}
                                        id={log.id}
                                        startTime={log.startTime}
                                        workoutName={log.name}
                                        exercises={log.exercises || []}
                                    />
                                ))
                            ) : (
                                <div className="no-logs-display">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                        <path d="..." />
                                    </svg>
                                    <h2>
                                        No logs yet!{' '}
                                        <Link className="glow-hover" to="/log/new">
                                            Let's create one
                                        </Link>
                                    </h2>
                                </div>
                            )}
                        </section>

                        <SlideInBottomMenu showMenu={showDeleteMenu} height="50%">
                            <DeleteButtonContainer />
                        </SlideInBottomMenu>

                        <Overlay showOverlay={showDeleteMenu} setShowOverlay={() => setShowDeleteMenu(false)} />
                    </>
                )}
            </main>

            <NavigationBar />
        </div>
    );
}