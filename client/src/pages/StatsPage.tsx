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
    const {setWeeklyVolumeData, setCategories, setBest1RM, setBodyWeightData} = useStatsContext();


    useEffect(() => {
        if (data) {
            setWeeklyVolumeData(data.weeklyVolumeData || []);
            setCategories(data.categories || []);
            setBest1RM(data.best1RMs || []);
            setBodyWeightData(data.bodyWeightData || []);
        }
    }, [data]);

    return (
        <div className="stats-page-wrapper">

            {isError ? (
                <ErrorPage
                    title="An error occurred while retrieving your stats"
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