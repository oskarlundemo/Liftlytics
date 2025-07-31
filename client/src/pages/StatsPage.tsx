import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import {StatisticsHeader} from "../components/StatisticsComponents/StatisticsHeader.tsx";
import '../styles/Statistics/Stats.css'
import {BentoBox} from "../components/StatisticsComponents/Bento/BentoBox.tsx";
import {Categories} from "../components/StatisticsComponents/Categories.tsx";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {ErrorPage} from "../components/MiscComponents/ErrorPage.tsx";
import {useStats} from "../hooks/statsHook.ts";
import {useEffect} from "react";
import {useStatsContext} from "../contexts/StatsContext.tsx";


export const StatsPage = () => {

    const {data, isError, isPending, isLoading, error} = useStats();
    const {setWeeklyVolumeData, setCategories, setBest1RM} = useStatsContext();


    useEffect(() => {
        if (data) {
            console.log(data);
            setWeeklyVolumeData(data.weeklyVolumeData || []);
            setCategories(data.categories || []);
            setBest1RM(data.best1RMs || []);
        }
    }, [data]);

    return (
        <div className="stats-page-wrapper">

            {isError ? (
                <ErrorPage
                    title="Something went wrong"
                    errorMessage={error.message}
                    details={error.code}
                />
            ) : isLoading || isPending ? (
                <LoadingPage title="Loading stats..." />
            ) : (
                <main className="statistics-main-box">
                    <StatisticsHeader title="Statistics" />
                    <BentoBox />
                    <Categories/>
                </main>
            )}

            <NavigationBar/>
        </div>
    )
}