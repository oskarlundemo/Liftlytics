
import React, { createContext, useState, useContext, ReactNode } from "react";

type ExerciseContextType = {
    customExercises: any[];
    setCustomExercises: (data: any[]) => void;

    selectedExercise: object
    setSelectedExercise: (data: object) => void;

    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
};

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const ExerciseProvider = ({ children }: Props) => {
    const [customExercises, setCustomExercises] = useState<any[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<object>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <ExerciseContext.Provider value={{
            customExercises,
            setCustomExercises,

            selectedExercise,
            setSelectedExercise,

            showMenu,
            setShowMenu,
        }}>
            {children}
        </ExerciseContext.Provider>
    );
};

export const useExerciseContext = (): ExerciseContextType => {
    const context = useContext(ExerciseContext);

    if (!context) {
        throw new Error("useExerciseContext must be used within a ExerciseProvider");
    }

    return context;
};
