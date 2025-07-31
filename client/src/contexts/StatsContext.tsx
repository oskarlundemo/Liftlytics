import React, {createContext, useState, ReactNode, useContext} from "react";

type StatsContextType = {
    weeklyVolumeData: any[];
    setWeeklyVolumeData: (data: any[]) => void;

    categories: any[]
    setCategories: (data: any[]) => void;

    best1RM: any[]
    setBest1RM: (data: any[]) => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

type StatsProviderProps = {
    children: ReactNode;
};

export const StatsProvider = ({ children }: StatsProviderProps) => {
    const [weeklyVolumeData, setWeeklyVolumeData] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [best1RM, setBest1RM] = useState<any>([]);

    return (
        <StatsContext.Provider value={{
            weeklyVolumeData,
            setWeeklyVolumeData,

            setCategories,
            categories,

            best1RM,
            setBest1RM,

        }}>
            {children}
        </StatsContext.Provider>
    );
};

export const useStatsContext = (): StatsContextType => {
    const context = useContext(StatsContext);

    if (!context) {
        throw new Error("useLogContext must be used within a StatsProvider");
    }
    return context;
};