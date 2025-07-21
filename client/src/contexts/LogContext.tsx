import { createContext, useContext, useState } from "react";

type LogContextType = {
    showAddExerciseMenu: boolean;
    setAddExerciseMenu: React.Dispatch<React.SetStateAction<boolean>>;

    showExerciseMenu: boolean;
    setShowExerciseMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: React.ReactNode }) => {
    const [showAddExerciseMenu, setAddExerciseMenu] = useState(false);
    const [showExerciseMenu, setShowExerciseMenu] = useState(false);

    return (
        <LogContext.Provider value={{
            showAddExerciseMenu,
            setAddExerciseMenu,

            showExerciseMenu,
            setShowExerciseMenu,
        }}>
            {children}
        </LogContext.Provider>
    );
};

export const useLog = (): LogContextType => {
    const context = useContext(LogContext);
    if (context === undefined) {
        throw new Error("useLog must be used within a LogProvider");
    }
    return context;
};
