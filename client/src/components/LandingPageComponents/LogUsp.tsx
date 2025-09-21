


import '../../styles/LandingPage/Usps.css'


export const LogUsp = () => {


    return (
        <section className={'log-usp usp'}>

            <div className="image-container flex items-center justify-center my-auto w-1/2 h-full my-auto relative ">

                <div className="relative w-fit">

                    <img src="./log.avif" alt="Showcase" className="max-w-full max-h-full" />

                    <div className={'adjusted-image-shadow w-1/2'}></div>
                </div>

            </div>

            <div className={'text-container w-1/2'}>

                <span className={'mr-auto'}>1</span>

                <h2>
                    Crush Every Session
                </h2>

                <p>
                    Never guess your progress again. Log every rep, set, and personal record in seconds, so you walk into every workout with a clear plan and leave knowing you’ve pushed further than before.
                </p>
            </div>

        </section>
    )
}