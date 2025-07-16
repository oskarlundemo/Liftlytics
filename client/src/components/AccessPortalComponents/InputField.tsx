



type InputFieldProps = {
    type?: string;
    value?: string;
    example?: string;
    name?: string;
    setState?: (value: string) => void;
};

export const InputField = ({ type = '', name = '', value = '', example = '', setState }: InputFieldProps) => {
    return (

        <div
            className="input-group type-md">

            <input
                id={name}
                required={true}
                className="default-input"
                type={type}
                value={value}
                name={name}
               onChange={(e) => setState?.(e.target.value)}
            />

            <label htmlFor={name}>{example}</label>

            <span className={'border'}></span>

        </div>
    );
};