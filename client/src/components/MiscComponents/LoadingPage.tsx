import {RingLoader} from "react-spinners";
import '../../styles/MiscStyles/LoadingPage.css'


type LoadingPageProps = {
    title: string
    errorMessage?: string
}


export const LoadingPage = ({title}:LoadingPageProps) => {

    return (
        <section className={`loading-page`}>

            <RingLoader
                size={100}
                color={'cyan'}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            <h1>{title}</h1>

        </section>
    )
}