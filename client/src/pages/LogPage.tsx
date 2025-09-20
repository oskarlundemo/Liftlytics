import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import '../styles/LogPage/LogPage.css'
import {LogPageHeader} from "../components/LogComponents/LogPageHeader.tsx";
import {useLogs} from "../hooks/logHook.ts";
import {SlideInBottomMenu} from "../components/MiscComponents/SlideInBottomMenu.tsx";
import {Overlay} from "../components/MiscComponents/Overlay.tsx";
import {useLogContext} from "../contexts/LogContext.tsx";
import {DeleteButtonContainer} from "../components/LogComponents/DeleteButtonContainer.tsx";
import {Link} from "react-router-dom";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {LogModule} from "../components/LogComponents/LogModule.tsx";

/**
 * Purpose:
 * This is the page where users can inspect their logs
 *
 * Key components:
 * <LogModule> <SlideBottomMenu> <DeleteButtonContainer> <NavigationBar>
 *
 * Notes:
 * Using css for styling and state to toggle slide-menu
 *
 * @constructor
 */


export const LogPage = () => {

    const { data, isLoading, isError, error } = useLogs();
    const {showDeleteMenu, setShowDeleteMenu} = useLogContext();

    if (isError) {
        return (
            <ErrorPage
                title="An error occurred while retrieving your logs"
                errorMessage={error.message}
                details={error?.message}
            />
        );
    }

    if (isLoading) {
        return <LoadingPage title="Loading your logs..." />;
    }

    return (
        <div className="log-page-container flex flex-col">
            <div className="log-page-wrapper">
                <LogPageHeader />

                <section className="log-body">
                    {data.sortedGroupedByMonth && Object.keys(data.sortedGroupedByMonth).length > 0 ? (
                        Object.entries(data.sortedGroupedByMonth).map(([monthKey, logs]) => (
                            <LogModule
                                logs={logs}
                                date={new Date(`${monthKey}-01`)}
                                key={monthKey}
                            />
                        ))
                    ) : (
                        <div className="no-logs-display">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e3e3e3">
                                <path d="..." />
                            </svg>
                            <h2 className="text-2lx">
                                No logs yet!{' '}
                                <Link className="glow-hover" to="/log/new">
                                    Let's create one
                                </Link>
                            </h2>
                        </div>
                    )}

                </section>


                <SlideInBottomMenu showMenu={showDeleteMenu} height="30%">
                    <DeleteButtonContainer />
                </SlideInBottomMenu>

                <Overlay
                    showOverlay={showDeleteMenu}
                    setShowOverlay={() => setShowDeleteMenu(false)}
                />

            </div>

            <NavigationBar />
        </div>
    );
}