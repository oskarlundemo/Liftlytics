import {useState} from "react";
import '../styles/AccessPortal/AccessPortal.css'
import {Login} from "../components/AccessPortalComponents/Login.tsx";
import {CreateAccount} from "../components/AccessPortalComponents/CreateAccount.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {Logo} from "../components/AccessPortalComponents/Logo.tsx";
import {AuthorDetails} from "../components/AccessPortalComponents/AuthorDetails.tsx";
import {useNavigate} from "react-router-dom";


/**
 * Purpose:
 * This page is the access portal, where users can either sign in or create their account
 *
 * Key components:
 * <Login> <CreateAccount> <AuthorDetails>
 *
 * Notes:
 * Using Framer Motions for transitions betweens forms, useNavigate for routing and CSS for styling
 *
 * @constructor
 */

export const AccessPortal = () => {

    const [showLogin, setShowLogin] = useState<boolean>(true);
    const navigate = useNavigate();

    return (
        <main className="access-portal main-container">

            <div className={'home-icon'}>
                <svg onClick={() => navigate('/')} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            </div>

            <section className="access-portal-left-container">


                <img
                    src={'gym.avif'}
                    loading="lazy"
                    alt={'Image of gym'}
                />


            </section>

            <section className="access-portal-right-container">

                <Logo/>

                <AnimatePresence initial={false} custom={showLogin}>
                    {showLogin ? (
                        <motion.div
                            className="motion-child"
                            key="login"
                            custom={showLogin}
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <Login setLogin={setShowLogin} />
                        </motion.div>
                    ) : (
                        <motion.div
                            className="motion-child"
                            key="create-account"
                            custom={showLogin}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <CreateAccount setLogin={setShowLogin} />
                        </motion.div>
                    )}

                </AnimatePresence>

                <AuthorDetails/>

            </section>

        </main>
    );
};