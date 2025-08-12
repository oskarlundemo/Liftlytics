

import '../../styles/LandingPage/LandingHeader.css'

export const LandingHeader = () => {


    return (

        <header className={'landing-header'}>

            <div className="video-background">
                <video autoPlay muted loop playsInline>
                    <source src="hero-video.mp4" type="video/mp4"/>
                </video>

                <div className="video-fade"></div>

            </div>

            <div className={'header-wrapper'}>

                <div className={'header-right flex flex-row justify-center items-center gap-5 h-full'}>

                    <div className="flex flex-col">
                        <h1>Liftlytics</h1>
                        <h2>Stop slacki'n & start tracki'n!</h2>
                    </div>

                </div>

            </div>

        </header>
    )
}