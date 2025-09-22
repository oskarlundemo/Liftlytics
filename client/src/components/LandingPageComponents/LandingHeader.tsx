

import '../../styles/LandingPage/LandingHeader.css'
import {useNavigate} from "react-router-dom";

export const LandingHeader = () => {

    const navigate = useNavigate();

    return (

        <header className={'landing-header'}>

            <div className="video-background">

                <div className="video-fade"></div>

            </div>

            <div className={'header-wrapper'}>

                <div className={'header-right flex flex-row justify-center items-center gap-5 h-full'}>

                    <div className="flex flex-col">
                        <h1>Liftlytics</h1>
                        <h2>Stop slacki'n & start tracki'n!</h2>

                        <div className={'button-wrapper button-header-wrapper flex flex-row justify-center gap-5 p-5 w-full'}>

                            <button onClick={() => navigate('/access-portal')} className={'w-1/2 flex flex-grow'}>Sing me up</button>

                            <button onClick={() => navigate('/access-portal')} className={'w-1/2 flex flex-grow'}>Sign me in</button>

                        </div>

                    </div>

                    <div className={'header-images'}>

                        <div className="first-image-wrapper">
                            <img  alt={'image from the app'} src='./overview-log.avif'></img>
                        </div>

                        <div className="second-image-wrapper">
                            <img alt={'image from the app'} src='./stats.avif'></img>
                        </div>

                        <div className={'image-shadow'}></div>

                    </div>

                </div>

            </div>

        </header>
    )
}