import { createContext, useContext, useState } from "react";

type LogContextType = {
    showAddExerciseMenu: boolean;
    setAddExerciseMenu: React.Dispatch<React.SetStateAction<boolean>>;

    showExerciseMenu: boolean;
    setShowExerciseMenu: React.Dispatch<React.SetStateAction<boolean>>;

    showConfigureExerciseMenu: boolean;
    setShowConfigureExerciseMenu: React.Dispatch<React.SetStateAction<boolean>>;


    deleteLogId: string;
    setDeleteLogId: React.Dispatch<React.SetStateAction<string>>;

    showDeleteMenu: boolean;
    setShowDeleteMenu: React.Dispatch<React.SetStateAction<boolean>>;

    selectedExercises: object[];
    setSelectedExercises: React.Dispatch<React.SetStateAction<object[]>>;

    selectedMuscleGroupName: string;
    setSelectedMuscleGroupName: React.Dispatch<React.SetStateAction<string>>;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: React.ReactNode }) => {
    const [showAddExerciseMenu, setAddExerciseMenu] = useState<boolean>(false);
    const [showExerciseMenu, setShowExerciseMenu] = useState<boolean>(false);
    const [showConfigureExerciseMenu, setShowConfigureExerciseMenu] = useState(false);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [deleteLogId, setDeleteLogId] = useState<string>('');

    const [selectedExercises, setSelectedExercises] = useState<object[]>([]);
    const [selectedMuscleGroupName, setSelectedMuscleGroupName] = useState<string>("");


    return (
        <LogContext.Provider value={{
            showDeleteMenu,
            setShowDeleteMenu,

            deleteLogId,
            setDeleteLogId,

            showAddExerciseMenu,
            setAddExerciseMenu,

            showExerciseMenu,
            setShowExerciseMenu,

            selectedExercises,
            setSelectedExercises,

            selectedMuscleGroupName,
            setSelectedMuscleGroupName,

            showConfigureExerciseMenu,
            setShowConfigureExerciseMenu,
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
