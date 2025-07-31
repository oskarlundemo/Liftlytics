import {useQuery} from "@tanstack/react-query";
import {fetchStatsData} from "../api/statsCalls.ts";


export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: fetchStatsData,
    })
}