import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteExercise, fetchCustomExercises, updateCustomExercise} from "../api/exerciseCalls.ts";
import toast from "react-hot-toast";


export const useExercises = () => {
    return useQuery({
        queryKey: ['customExercises'],
        queryFn: fetchCustomExercises,
    })
}


export const useDeleteExercise = (setCustomExercises: (exercises: any[]) => void) => {
    return useMutation({
        mutationFn: deleteExercise, // make sure this function is defined or imported
        onMutate: () => {
            toast.dismiss();
            toast.loading('Deleting exercise...');
        },
        onSuccess: (_data, deletedId) => {
            toast.dismiss();
            toast.success('Exercise successfully deleted!');

            setCustomExercises(prev => prev.filter(ex => ex.id !== deletedId));
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error deleting exercise');
        },
    });
};


export const useUpdateCustomExercise = (setCustomExercises: (exercises: any[]) => void) => {
    return useMutation({
        mutationFn: updateCustomExercise,
        onMutate: () => {
            toast.dismiss();
            toast.loading('Updating exercise...');
        },
        onSuccess: (response, _variables) => {
            toast.dismiss();
            toast.success('Exercise successfully updated!');
            const updatedExercise = response.data;
            console.log(response);

            setCustomExercises(prev => {
                const cleanPrev = prev.filter(ex => ex && ex.id);

                // If the exercise already exists, replace it, else add it
                const exists = cleanPrev.some(ex => ex.id === updatedExercise.id);

                if (exists) {
                    return cleanPrev.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex);
                } else {
                    return [...cleanPrev, updatedExercise];
                }
            });
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error updating exercise');
        },
    });
};
