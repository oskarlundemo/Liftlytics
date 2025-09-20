import { createContext, useState, useContext, type ReactNode } from "react";

type StatsContextType = {
    volumeData: any;
    setVolumeData: (data: any[]) => void;

    categories: any[]
    setCategories: (data: any[]) => void;

    best1RM: any[]
    setBest1RM: (data: any[]) => void;

    bodyWeightData: any[];
    setBodyWeightData: (data: any[]) => void;

    workoutStreakData: any;

    setWorkoutStreakData: (data: any[]) => void;

    averageDuration: any;
    setAverageDuration: any;

    checkedCalenderDates: any[]
    setCheckedCalenderDates: (data:  Date[]) => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

type StatsProviderProps = {
    children: ReactNode;
};

type VolumeData = {
    summary: any[]
    numberOfSets: number
}

export const StatsProvider = ({ children }: StatsProviderProps) => {
    const [volumeData, setVolumeData] = useState<VolumeData[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [best1RM, setBest1RM] = useState<any>([]);
    const [bodyWeightData, setBodyWeightData] = useState<any[]>([]);
    const [workoutStreakData, setWorkoutStreakData] = useState<any[]>([]);
    const [averageDuration, setAverageDuration] = useState<any>([]);
    const [checkedCalenderDates, setCheckedCalenderDates] = useState<Date[]>([]);

    return (
        <StatsContext.Provider value={{

            checkedCalenderDates,
            setCheckedCalenderDates,

            bodyWeightData,
            setBodyWeightData,

            volumeData,
            setVolumeData,

            setCategories,
            categories,

            best1RM,
            setBest1RM,

            workoutStreakData,
            setWorkoutStreakData,

            averageDuration,
            setAverageDuration,

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