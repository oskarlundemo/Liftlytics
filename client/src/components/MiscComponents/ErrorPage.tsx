


import "../../styles/MiscStyles/ErrorPage.css";

type ErrorPageProps = {
    title: string;
    errorMessage?: string;
    details?: string;
};

export const ErrorPage = ({ title, errorMessage, details }: ErrorPageProps) => {
    return (
        <section className="error-page">
            <div className="error-box">
                <h1 className="error-subtitle">{title}</h1>

                {errorMessage && <p className="error-message">{errorMessage || 'An error occurred'}</p>}
                {details && (
                    <details className="error-details">
                        <summary>More info</summary>
                        <pre>{details || 'Undefined error'}</pre>
                    </details>
                )}
            </div>
        </section>
    );
};