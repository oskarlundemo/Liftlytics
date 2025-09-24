import * as React from "react";
import {CustomInput} from "../MiscComponents/CustomInput.tsx";
import {useEffect, useState} from "react";
import '../../styles/AccessPortal/AccessPortal.css'
import {OrDivider} from "./OrDivider.tsx";
import {AuthOption} from "./AuthOption.tsx";
import toast from "react-hot-toast";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {supabase} from "../../services/supabase.ts";


type LoginProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({setLogin}: LoginProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const {loginWithGoogle, loginWithEmail, loginGuest} = useAuth();

    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        setDisabled(!(email.length > 0 && password.length > 0));
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.trim().length === 0 || password.trim().length === 0) return;

        try {
            const result = await loginWithEmail(email, password);

            if (result.success) {
                toast.success("Successfully logged in!");
                navigate("/log");
            } else {
                toast.error(result.error || "Login failed.");
            }
        } catch (err) {
            console.error("Unexpected login error:", err);
            toast.error("Unexpected error during login.");
        }
    };


    const handleGoogleLogin = async () => {
        const result = await loginWithGoogle();
        if (!result.success) {
            toast.error(result.error || "Google sign-in failed.");
        } else {
            toast.loading("Redirecting to Google login...");
        }
    };


    const handleGuestLogin = async () => {
        const email = import.meta.env.VITE_GUEST_EMAIL;
        const password = import.meta.env.VITE_GUEST_PASSWORD;

        try {
            const result = await loginWithEmail(email, password);

            if (result.success) {
                toast.success("Successfully logged in!");
                navigate("/log");
            } else {
                toast.error(result.error || "Login failed.");
            }
        } catch (err) {
            console.error("Unexpected guest login error:", err);
            toast.error("Unexpected error during guest login.");
        }
    };

    return (

        <section className="access-portal-box">

            <h1 className={'font-bold text-2xl'}>Login</h1>

            <form
                className={'access-portal-form'}

                onSubmit={handleSubmit}>

                <CustomInput
                    type="text"
                    setState={setEmail}
                    example={'Email'}
                    value={email}
                    name="email"
                />

                <CustomInput
                    type="password"
                    setState={setPassword}
                    example={'Password'}
                    value={password}
                    name="password"
                />


                <button
                    className="button-intellij"
                    disabled={disabled}
                    type={"submit"}>
                    Login
                </button>

            </form>

            <OrDivider/>

            <AuthOption
                optionName={'Google'}
                optionIcon={
                    <svg viewBox="0 0 128 128">
                        <path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"></path><path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"></path><path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"></path><path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"></path><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"></path>
                    </svg>
                }
                action={handleGoogleLogin}
            />

            <h3 className={'text-base'}>Not signed up yet? {}
                <span style={{color: 'var(--color-accent)'}} className={'hover-text font-bold'} onClick={() => setLogin(false)}>
                    Click here
                </span>
            </h3>

            <h4
                style={{color: 'var(--color-text-muted)'}}
                onClick={() => handleGuestLogin()}
                className={'guest-button m-0 text-sm font-bold'}
            >
                Continue as guest</h4>


        </section>
    )
}