import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteExercise, fetchCustomExercises, updateCustomExercise, createCustomExercise} from "../api/exerciseCalls.ts";
import toast from "react-hot-toast";
import type {Dispatch, SetStateAction} from "react";

type CustomExercise = {
    id: string;
    name: string;
};


export const useExercises = () => {
    return useQuery({
        queryKey: ['customExercises'],
        queryFn: fetchCustomExercises,
    })
}



export const useDeleteExercise = (
    setCustomExercises: any
) => {
    return useMutation({
        mutationFn: deleteExercise,
        onMutate: () => {
            toast.dismiss();
            toast.loading("Deleting exercise...");
        },
        onSuccess: (_data, deletedId) => {
            toast.dismiss();
            toast.success("Exercise successfully deleted!");
            // @ts-ignore
            setCustomExercises(prev => prev.filter(ex => ex.id !== deletedId));
        },
        onError: () => {
            toast.dismiss();
            toast.error("Error deleting exercise");
        },
    });
};


export const useUpdateCustomExercise = (
    setCustomExercises: Dispatch<SetStateAction<CustomExercise[]>>
) => {
    return useMutation({
        mutationFn: updateCustomExercise,
        onMutate: () => {
            toast.dismiss();
            toast.loading("Updating exercise...");
        },
        onSuccess: (response) => {
            toast.dismiss();
            toast.success("Exercise successfully updated!");

            const updatedExercise = response.updatedExercise;

            setCustomExercises(prev => {
                const cleanPrev = prev.filter(ex => ex && ex.id);
                return cleanPrev.map(ex =>
                    ex.id === updatedExercise.id ? updatedExercise : ex
                );
            });
        },
        onError: () => {
            toast.dismiss();
            toast.error("Error updating exercise");
        },
    });
};



export const useCreateCustomExercise = (setCustomExercises: any) => {
    return useMutation({
        mutationFn: createCustomExercise,
        onMutate: () => {
            toast.dismiss()
            toast.loading('Creating exercise')
        },
        onSuccess: (response) => {
            toast.dismiss();
            toast.success('Exercise successfully updated!');
            const newExercise = response.newExercise;

            // @ts-ignore
            setCustomExercises(prev => [
                ...prev, newExercise
            ])
        },
        onError: () => {
            toast.dismiss();
            toast.error('Error creating exercise');
        },
    })

}
