import {useMutation, useQuery} from '@tanstack/react-query'
import {createCustomMuscleGroup, deleteCustomMuscleGroup, fetchMuscleGroups} from "../api/muscleGroupCalls.ts";
import toast from "react-hot-toast";




export const useFetchMuscleGroups = (userId:string) => {
    return useQuery({
        queryKey: ['categories', userId],
        queryFn: () => fetchMuscleGroups(),
    })
}


export const useCreateMuscleGroup = (setCustomMuscleGroups: any) => {

    return useMutation({
        mutationFn: createCustomMuscleGroup,
        onMutate: () => {
            toast.dismiss()
            toast.loading('Creating muscle group...')
        },
        onSuccess: (response) => {
            toast.dismiss();
            toast.success('Muscle group successfully updated!');
            const newExercise = response.muscleGroup;
            setCustomMuscleGroups((prev: any) => [
                ...prev, newExercise
            ])
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error creating muscle group');
        },
    })
}


export const useDeleteMuscleGroup = (setCustomMuscleGroups: any) => {
    return useMutation({
        mutationFn: deleteCustomMuscleGroup,
        onMutate: () => {
            toast.dismiss()
            toast.loading('Deleting muscle group...')
        },
        onSuccess: (response) => {
            toast.dismiss();
            toast.success('Muscle group successfully updated!');
            const deleteId = response.deletedId;
            setCustomMuscleGroups((prev: any[]) => prev.filter((c: { id: any; }) => c.id !== deleteId));
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error deleting muscle group');
        },
    })
}