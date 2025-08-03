



type InputFieldProps = {
    type?: string;
    value?: string;
    example?: string;
    name?: string;
    setState?: (value: string) => void;
    isRequired?: boolean;
    placeholder?: string;
    keyDownAction?: (e: React.KeyboardEvent) => void;
};

export const CustomInput = ({ type = '', isRequired = true, name = '', keyDownAction, placeholder, value = '', example = '', setState }: InputFieldProps) => {
    return (

        <div
            className="input-group type-md">

            <input
                id={name}
                required={isRequired}
                className="default-input"
                type={type}
                value={value}
                name={name}
                onChange={(e) => setState?.(e.target.value)}
                placeholder={placeholder}
                onKeyDown={keyDownAction}
            />

            <label htmlFor={name}>{example}</label>

            <span className={'border'}></span>

        </div>
    );
};