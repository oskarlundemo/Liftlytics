import {createContext, useContext, useState} from "react";

type LogContextType = {

    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;

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

    showCustomExerciseMenu: boolean;
    setShowCustomExerciseMenu: React.Dispatch<React.SetStateAction<boolean>>;

    selectedExercises: any;
    setSelectedExercises: React.Dispatch<React.SetStateAction<object[]>>;

    selectedMuscleGroup: object;
    setSelectedMuscleGroup: React.Dispatch<React.SetStateAction<object>>;

    muscleGroupCategories: object;
    setMuscleGroupCategories: React.Dispatch<React.SetStateAction<object>>;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: React.ReactNode }) => {
    const [showAddExerciseMenu, setAddExerciseMenu] = useState<boolean>(false);
    const [showExerciseMenu, setShowExerciseMenu] = useState<boolean>(false);
    const [showConfigureExerciseMenu, setShowConfigureExerciseMenu] = useState(false);
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [deleteLogId, setDeleteLogId] = useState<string>('');
    const [showCustomExerciseMenu, setShowCustomExerciseMenu] = useState<boolean>(false);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<object>([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedExercises, setSelectedExercises] = useState<object>([]);
    const [muscleGroupCategories, setMuscleGroupCategories] = useState<any>([]);


    return (
        <LogContext.Provider value={{

            muscleGroupCategories,
            setMuscleGroupCategories,

            selectedMuscleGroup,
            setSelectedMuscleGroup,

            showCustomExerciseMenu,
            setShowCustomExerciseMenu,

            showDeleteMenu,
            setShowDeleteMenu,

            isEditing,
            setIsEditing,

            deleteLogId,
            setDeleteLogId,

            showAddExerciseMenu,
            setAddExerciseMenu,

            showExerciseMenu,
            setShowExerciseMenu,

            selectedExercises,
            setSelectedExercises,

            showConfigureExerciseMenu,
            setShowConfigureExerciseMenu,
        }}>
            {children}
        </LogContext.Provider>
    );
};

export const useLogContext = (): LogContextType => {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error("useLogContext must be used within a StatsProvider");
    }
    return context;
};
