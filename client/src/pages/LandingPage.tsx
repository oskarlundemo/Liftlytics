

import {LandingHeader} from "../components/LandingPageComponents/LandingHeader.tsx";
import {Carousel} from '../components/LandingPageComponents/Carousel.tsx'
import '../styles/LandingPage/Landing.css'
import {LogUsp} from '../components/LandingPageComponents/LogUsp.tsx'
import {ProgressUsp} from "../components/LandingPageComponents/ProgressUsp.tsx";
import {ChartUsp} from "../components/LandingPageComponents/ChartUsp";

export const LandingPage = () => {

        const reviews = [
            {
                name: "Alex M.",
                comment: "This app helped me stay consistent with my workouts and track my progress easily!"
            },
            {
                name: "Taylor S.",
                comment: "Love how I can log my body weight daily and see my improvements over time."
            },
            {
                name: "Jordan P.",
                comment: "The exercise tracker is simple but very effective. Keeps me motivated!"
            },
            {
                name: "Morgan L.",
                comment: "A great tool for anyone serious about fitness. The interface is clean and intuitive."
            },
            {
                name: "Casey R.",
                comment: "I’ve tried many apps, but this one nails the tracking features I actually need."
            },
            {
                name: "Jamie C.",
                comment: "Easy to use and perfect for keeping an eye on my weight goals."
            },
            {
                name: "Riley K.",
                comment: "The workout logs help me push harder and stay accountable."
            },
            {
                name: "Sam B.",
                comment: "Tracking both weight and exercises in one place saves me so much time."
            },
            {
                name: "Drew F.",
                comment: "Perfect for beginners and advanced users alike."
            },
            {
                name: "Pat N.",
                comment: "Love the progress charts — they really motivate me to keep going!"
            }
        ];

        const allReviews = [...reviews, ...reviews];

    return (

        <div className={'landing-page-wrapper'}>

            <LandingHeader />

            <div className={'landing-page'}>

                <main className={'landing-page-main'}>

                    <LogUsp/>

                    <ChartUsp/>

                    <ProgressUsp/>

                </main>

            </div>

            <footer className={'footer'}>
                <Carousel>
                    {allReviews.map((review, index) => (
                        <div className={'flex flex-col gap-5 review-card'} key={index}>
                            <p className={'text-l'}>"{review.comment}"</p>
                            <h3 style={{color: 'var(--color-text-muted)'}} className={'text-base'}>- {review.name}</h3>
                        </div>
                    ))}
                </Carousel>
            </footer>

        </div>
    )

}