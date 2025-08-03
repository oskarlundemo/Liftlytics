import {useState} from "react";
import '../styles/AccessPortal/AccessPortal.css'
import {Login} from "../components/AccessPortalComponents/Login.tsx";
import {CreateAccount} from "../components/AccessPortalComponents/CreateAccount.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {Logo} from "../components/AccessPortalComponents/Logo.tsx";
import {AuthorDetails} from "../components/AccessPortalComponents/AuthorDetails.tsx";

export const AccessPortal = () => {

    const [showLogin, setShowLogin] = useState<boolean>(true);

    return (
        <main className="access-portal main-container">

            <section className="access-portal-left-container"/>

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