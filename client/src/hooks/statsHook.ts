import {useQuery, useMutation} from "@tanstack/react-query";
import {fetchStatsData, getMonthVolume} from "../api/statsCalls.ts";

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: fetchStatsData,
    })
}


export const useVolumeData = (date: Date) => {
    return useQuery({
        queryKey: ['volume', date.toISOString()],
        queryFn: () => getMonthVolume(date),
        enabled: !!date,
    });
};


export const useVolumeDataLazy = () => {
    const {
        mutateAsync,
        data,
        error,
        isLoading,
        isError,
    } = useMutation({
        mutationFn: (date: Date) => getMonthVolume(date),
    });

    return {
        fetchVolumeData: mutateAsync,
        data,
        error,
        isLoading,
        isError,
    };
};