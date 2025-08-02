
import React, { createContext, useState, useContext, ReactNode } from "react";

type ExerciseContextType = {
    customExercises: any[];
    setCustomExercises: (data: any[]) => void;

    selectedExercise: object
    setSelectedExercise: (data: object) => void;

    allMuscleGroups: object
    setAllMuscleGroups: (data: any[]) => void;

    showPopUp: boolean;
    setShowPopUp: (showPopUp: boolean) => void;

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
    const [showPopUp, setShowPopUp] = useState(false);
    const [allMuscleGroups, setAllMuscleGroups] = useState<object[]>([]);

    return (
        <ExerciseContext.Provider value={{
            customExercises,
            setCustomExercises,

            allMuscleGroups,
            setAllMuscleGroups,

            showPopUp,
            setShowPopUp,

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
