import {addUserToDB} from '../api/authorization.ts'
import {useMutation} from "@tanstack/react-query";

export const useAuthorzation = () => {
    return useMutation({
        mutationFn: addUserToDB,
    });
};
