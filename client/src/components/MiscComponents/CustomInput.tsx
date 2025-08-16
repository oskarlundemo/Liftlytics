import {useEffect, useState} from "react";


type InputFieldProps = {
    type?: string;
    value?: string;
    example?: string;
    name?: string;
    setState?: (value: string) => void;
    isRequired?: boolean;
    placeholder?: string;
    keyDownAction?: (e: React.KeyboardEvent) => void;
    maxLength?: number;
};

export const CustomInput = ({ type = '', isRequired = true, name = '', maxLength, keyDownAction, placeholder, value = '', example = '', setState }: InputFieldProps) => {

    const [chars, setChars] = useState<number>(0)

    useEffect(() => {
        setChars(value.length)
    }, [value])


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            value.length >= maxLength &&
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)
        ) {
            e.preventDefault();
        }
    }


    return (

        <div
            className={`input-group type-md ${maxLength ? 'gap-5' : ''}`}>

            <input
                id={name}
                required={isRequired}
                className="default-input"
                type={type}
                value={value}
                name={name}
                onChange={(e) => setState?.(e.target.value)}
                placeholder={placeholder}
                onKeyDown={maxLength ? handleKeyDown : keyDownAction}
            />

            <label htmlFor={name}>{example}</label>

            <span className={'border'}></span>


            {maxLength && (
                <h4
                    style={{ color: chars >= maxLength ? 'var(--color-error)' : 'var(--color-text-muted)', zIndex: 4, background: 'var(--color-bg)', transition: 'var(--transition-fast)' }}
                    className={`flex items-center justify-end h-full ${chars >= maxLength ? 'text-xl' : 'text-base'}`}
                >
                    {chars} / {maxLength}
                </h4>
            )}
        </div>
    );
};