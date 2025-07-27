

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {
    deleteExerciseLog,
    fetchExerciseCategories,
    fetchLogs,
    postNewWorkout,
    searchForExercise
} from '../api/logCalls.ts'

export const useLogs = () => {
    return useQuery({
        queryKey: ['logs'],
        queryFn: fetchLogs,
    })
}


export const useDeleteLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteExerciseLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['logs'] });
        },
    });
};


export const usePostWorkout = () => {
    return useMutation({
        mutationFn: postNewWorkout,
    });
};

export const useFetchExercises = () => {
    return useQuery({
        queryKey: ['exercise'],
        queryFn: fetchExerciseCategories,
    })
}


export const useSearchExercises = (query: string) => {
    return useQuery({
        queryKey: ['search-exercises', query],
        queryFn: () => searchForExercise(query),
        enabled: !!query && query.length > 1,
    });
};