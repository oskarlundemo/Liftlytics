import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {
    deleteExerciseLog,
    fetchExerciseCategories,
    fetchLogs, getLogById,
    postNewWorkout,
    searchForExercise, updateWorkout
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


export const useUpdateWorkout = (id: string) => {
    return useMutation({
        mutationFn: (workoutData:any) => updateWorkout(workoutData, id),
    });
};


export const useFetchLogById = (id: string) => {
    return useQuery({
        queryKey: ['log', id],
        queryFn: () => getLogById(id),
        enabled: !!id,
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