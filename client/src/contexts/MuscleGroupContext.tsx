
import React, { createContext, useState, useContext, ReactNode } from "react";



type MuscleGroupContextType = {

    customMuscleGroups: any[];
    setCustomMuscleGroups: (data: any[]) => void;

    muscleGroups: any
    setMuscleGroups: (data: any[]) => void;

    selectedMuscleGroup: object
    setSelectedMuscleGroup: (data: object) => void;

    allMuscleGroups: object
    setAllMuscleGroups: (data: any[]) => void;

    showPopUp: boolean;
    setShowPopUp: (showPopUp: boolean) => void;

    showMenu: boolean;
    setShowMenu: (show: boolean) => void;

    showCreateMenu: boolean;
    setShowCreateMenu: (showCreateMenu: boolean) => void;
}



const MuscleGroupContext = createContext<MuscleGroupContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const MuscleGroupProvider = ({ children }: Props) => {

    const [muscleGroups, setMuscleGroups] = useState<any>([])

    const [customMuscleGroups, setCustomMuscleGroups] = useState<any[]>([]);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<object>(null);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [allMuscleGroups, setAllMuscleGroups] = useState<object[]>([]);
    const [showCreateMenu, setShowCreateMenu] = useState<boolean>(false);


    return (
        <MuscleGroupContext.Provider value={{
            muscleGroups,
            setMuscleGroups,

            customMuscleGroups,
            setCustomMuscleGroups,

            showCreateMenu,
            setShowCreateMenu,

            allMuscleGroups,
            setAllMuscleGroups,

            showPopUp,
            setShowPopUp,

            selectedMuscleGroup,
            setSelectedMuscleGroup,

            showMenu,
            setShowMenu,
        }}>
            {children}
        </MuscleGroupContext.Provider>
    );
}

export const useMuscleGroupsContext = (): MuscleGroupContextType => {
    const context = useContext(MuscleGroupContext);

    if (!context) {
        throw new Error("useMuscleGroupContext must be used within a MuscleGroupProvider");
    }

    return context;
};