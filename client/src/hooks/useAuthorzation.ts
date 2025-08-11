import {deleteUser, syncUser} from '../api/authorization.ts'
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAuthorization = () => {
    return useMutation({
        mutationFn: syncUser,
    });
};


export const useDeleteUser = () => {
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success('Account deleted!');
        },
        onError: (error: any) => {
            console.error('Error deleting user:', error);
            toast.error(error?.message || 'Failed to delete user');
        },
    });
}