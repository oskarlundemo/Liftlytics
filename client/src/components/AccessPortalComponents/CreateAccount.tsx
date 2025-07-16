import * as React from "react";



type CreateAccountProps = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAccount = ({setLogin} : CreateAccountProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLogin(true)
    }

    return (

        <section className="access-portal-box">

            <h1>Create account</h1>

            <form onSubmit={handleSubmit}>
                <button
                    className="button-intellij"
                    type={"submit"}>
                    Create
                </button>

            </form>


        </section>
    )


}