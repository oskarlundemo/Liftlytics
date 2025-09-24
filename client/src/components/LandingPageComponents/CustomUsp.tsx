import '../../styles/LandingPage/Usps.css'

export const CustomUsp = () => {


    return (
        <section className={'custom-usp usp'}>

            <div className="flex flex-col w-1/2 items-center align-middle">

                <img src="./edit-exercise.avif" alt="Showcase" className="max-w-full max-h-full" />

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