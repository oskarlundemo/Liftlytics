import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";


export const RouteCatcher = ({}) => {

    const navigate = useNavigate()
    const {user} = useAuth();

    return (
        <div className={'h-full flex route-catcher-wrapper flex-col w-full items-center route-wrapper'}>
            <main className={'my-auto flex gap-3 flex-col'}>

                <h1 style={{color: 'var(--color-primary)'}}  className={'text-9xl text-center font-bold'}>404</h1>
                <h2 style={{color: 'var(--color-text)'}} className={'text-4xl'}>Something's not right</h2>
                <h3 style={{color: 'var(--color-text-muted)'}} className={'text-xl text-center'}>That page doesn't exist.</h3>



                <div className={'button-wrapper button-header-wrapper flex flex-row justify-center gap-5 p-5 w-full'}>

                    <button onClick={() => navigate(-1)} className={'w-1/2 flex flex-grow'}>
                        <div className={'flex flex-row w-full items-center justify-between'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                            <p>Go back</p>
                        </div>

                    </button>


                    <button onClick={() => navigate(user ? '/log' : '/')} className={'w-1/2 flex flex-grow'}>
                        <div className={'flex flex-row w-full items-center justify-between'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                            <p>Go home</p>
                        </div>
                    </button>

                </div>

            </main>
        </div>
    )
}