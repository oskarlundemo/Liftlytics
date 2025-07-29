import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {
    createCustomExercise,
    deleteExerciseLog,
    fetchExerciseCategories,
    fetchLogs, getLogById,
    postNewWorkout,
    searchForExercise, updateWorkout
} from '../api/logCalls.ts'
import toast from "react-hot-toast";

export const useLogs = () => {
    return useQuery({
        queryKey: ['logs'],
        queryFn: fetchLogs,
    })
}


export const useCustomExercise = () => {
    return useMutation({
        mutationFn: ({ muscleGroup, name }: { muscleGroup: object; name: string }) =>
            createCustomExercise(muscleGroup, name),
        onMutate: () => {
            toast.dismiss();
            toast.loading('Creating custom exercise...');
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success('Exercises successfully created!');
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error creating custom exercise');
        },
    });
};


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
        onMutate: () => {
            toast.dismiss();
            toast.loading('Creating a new workout....');
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success('Workout was successfully created!');
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error creating workout');
        },
    });
};


export const useUpdateWorkout = (id: string) => {
    return useMutation({
        mutationFn: (workoutData:any) => updateWorkout(workoutData, id),
        onMutate: () => {
            toast.loading('Updating workout...');
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success('Workout was successfully updated!');
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error updating workout');
        },
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