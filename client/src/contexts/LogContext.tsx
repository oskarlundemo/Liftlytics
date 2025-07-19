import { createContext, useContext, useState } from "react";

type LogContextType = {
    showNewWorkout: boolean;
    setShowNewWorkout: React.Dispatch<React.SetStateAction<boolean>>;
    workoutName: string;
    setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: React.ReactNode }) => {
    const [showNewWorkout, setShowNewWorkout] = useState(false);
    const [workoutName, setWorkoutName] = useState("");

    return (
        <LogContext.Provider value={{
            showNewWorkout,
            setShowNewWorkout,
            workoutName,
            setWorkoutName,
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
