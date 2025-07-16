import * as React from "react";
import {InputField} from "./InputField.tsx";
import {useState} from "react";



type LoginProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({setLogin}: LoginProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLogin(false)

    }

    return (

        <section className="access-portal-box">

            <h1>Login</h1>

            <form

                style={{
                    overflow: 'hidden'
                }}

                onSubmit={handleSubmit}>

                <InputField
                    type="text"
                    setState={setEmail}
                    example={'Email'}
                    value={email}
                    name="email"
                />

                <InputField
                    type="password"
                    setState={setPassword}
                    example={'Password'}
                    value={password}
                    name="password"
                />

                <button
                    className="button-intellij"
                    type={"submit"}>
                    Login
                </button>

            </form>

        </section>
    )
}