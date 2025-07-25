import {syncUser} from '../api/authorization.ts'
import {useMutation} from "@tanstack/react-query";

export const useAuthorization = () => {
    return useMutation({
        mutationFn: syncUser,
    });
};
