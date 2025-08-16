import '../../styles/LandingPage/Usps.css'

export const CustomUsp = () => {


    return (
        <section className={'custom-usp usp'}>

            <div className="image-container flex items-center justify-center my-auto w-1/2 h-full relative ">

                <div className="relative w-fit">
                    <img src="./custom.png" alt="Showcase" className="max-w-full max-h-full" />
                    <div className={'adjusted-image-shadow w-1/2'}></div>
                </div>

            </div>

            <div className={'text-container w-1/2'}>

                <span className={'mr-auto'}>2</span>

                <h2>
                    Build Your Perfect Routine
                </h2>

                <p>
                    Your training, your rules. Create custom exercises and muscle groups that match your style — from unconventional lifts to unique categories — so every workout log feels like it was built just for you.
                </p>
            </div>

        </section>
    )
}