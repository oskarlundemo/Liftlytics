

type RowInputProps = {
    inputState: any;
    setInputState: (state: any) => void;
    inputType: string;
    title: string;
    placeholder?: string;
};

export const RowInput = ({ inputState, setInputState, inputType, title, placeholder }: RowInputProps) => {

    return (
        <div className="exercise-module-input">
            <h4>{title}</h4>
            <input
                type={inputType}
                min={0}
                value={inputState ?? ''}
                onChange={(e) =>
                    setInputState(
                        inputType === 'number' ? Number(e.target.value) : e.target.value
                    )
                }
                placeholder={placeholder}
            />
        </div>
    );
};
