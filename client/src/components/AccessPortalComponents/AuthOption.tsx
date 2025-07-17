


type AuthProps = {
    optionName: string
    optionIcon: any
    action: () => void
}


export const AuthOption = ({optionName, optionIcon, action}: AuthProps) => {

    return (
        <div
            onClick={() => {
                action();
            }}
            className="auth-option-card">
            <h2>{optionName}</h2>
            {optionIcon}
        </div>
    )
}