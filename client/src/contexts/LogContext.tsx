import { createContext, useContext, useState } from "react";

type LogContextType = {
    showNewWorkout: boolean;
    setShowNewWorkout: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: React.ReactNode }) => {
    const [showNewWorkout, setShowNewWorkout] = useState(false);

    return (
        <LogContext.Provider value={{
            showNewWorkout,
            setShowNewWorkout
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
