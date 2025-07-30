import {NavigationBar} from "../components/MiscComponents/NavigationBar.tsx";
import {StatisticsHeader} from "../components/StatisticsComponents/StatisticsHeader.tsx";
import '../styles/Statistics/Stats.css'
import {BentoBox} from "../components/StatisticsComponents/Bento/BentoBox.tsx";
import {Categories} from "../components/StatisticsComponents/Categories.tsx";

export const StatisticsPage = () => {

    return (
        <div className="stats-page-wrapper">

            <main className="statistics-main-box">

                <StatisticsHeader title={'Statistics'} />

                <BentoBox/>

                <Categories/>

            </main>


            <NavigationBar/>
        </div>
    )
}