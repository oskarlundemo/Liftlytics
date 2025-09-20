import {useQuery, useMutation} from "@tanstack/react-query";
import {fetchExerciseStats, fetchStatsData, getMonthVolume} from "../api/statsCalls.ts";

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: fetchStatsData,
    })
}


export const useFetchDetails = (exerciseName: string, exerciseId: string) => {
    return useQuery({
        queryKey: ['stats', exerciseName, exerciseId],
        queryFn: () => fetchExerciseStats({ exerciseName, exerciseId }),
        enabled: !!exerciseName && !!exerciseId,
    });
};


export const useVolumeDataLazy = () => {
    const {
        mutateAsync,
        data,
        error,
        isError,
        isPending,
    } = useMutation({
        mutationFn: (date: Date) => getMonthVolume(date),
    });

    return {
        fetchVolumeData: mutateAsync,
        data,
        error,
        isPending,
        isError,
    };
};