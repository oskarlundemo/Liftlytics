

import {LandingHeader} from "../components/LandingPageComponents/LandingHeader.tsx";
import {Reveal} from '../components/LandingPageComponents/Reveal.tsx'
import '../styles/LandingPage/Landing.css'
import {LogUsp} from '../components/LandingPageComponents/LogUsp.tsx'
import {CustomUsp} from "../components/LandingPageComponents/CustomUsp.tsx";
import {ChartUsp} from "../components/LandingPageComponents/ChartUsp";
import {LandingFooter} from "../components/LandingPageComponents/LandingFooter.tsx";
import {FAQ} from "../components/LandingPageComponents/FAQ";


/**
 * Purpose:
 * This is the landing page, where users are introduced to the app
 *
 * Key components:
 * <Reveal> <LandingHeader> <ChartUsp> <LogUsp> <CustomUsp>
 *
 * Notes:
 * Using Framer Motion for the reveal animation on scroll
 *
 * @constructor
 */



export const LandingPage = () => {


    return (

        <div className={'landing-page-wrapper'}>

            <LandingHeader />

            <div className={'landing-page'}>

                <main className={'landing-page-main'}>

                    <Reveal width={'100%'}>
                        <LogUsp/>
                    </Reveal>


                    <Reveal width={'100%'}>
                        <CustomUsp/>
                    </Reveal>

                    <Reveal width={'100%'}>
                        <ChartUsp/>
                    </Reveal>

                </main>


                <FAQ/>


                <LandingFooter/>

            </div>

        </div>
    )

}