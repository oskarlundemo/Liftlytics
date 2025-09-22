

import {useNavigate} from "react-router-dom";
import {useAuthorization} from "../../hooks/useAuthorzation.ts";
import {useEffect, useState} from "react";
import {supabase} from "../../services/supabase.ts";
import {LoadingPage} from "../MiscComponents/LoadingPage.tsx";



export const CallbackPage = () => {

    const navigate = useNavigate();
    const mutation = useAuthorization();
    const [hasCalled, setHasCalled] = useState(false);

    useEffect(() => {
        if (hasCalled) return;

        async function handleCallback() {

            setHasCalled(true);

            const {data: { session }, error,} = await supabase.auth.getSession();

            if (error || !session?.user) {
                console.error("No session or error", error);
                navigate("/");
                return;
            }

            mutation.mutate(
                { id: session.user.id, email: session.user.email },
                {
                    onSuccess: () => {
                        navigate("/log");
                    },
                    onError: (err) => {
                        console.error("Failed to sync user:", err);
                        navigate("/");
                    },
                }
            );
            navigate("/log");
        }

        handleCallback();
    }, [navigate]);

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
            className={'callback-page'}>

            <LoadingPage
                title={'Loading your profile...'}
            />

        </main>
    )
}