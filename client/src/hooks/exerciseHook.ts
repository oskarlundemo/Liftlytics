import {useQuery} from "@tanstack/react-query";
import {fetchCustomExercises} from "../api/exerciseCalls.ts";


export const useExercises = () => {
    return useQuery({
        queryKey: ['customExercises'],
        queryFn: fetchCustomExercises,
    })
}
