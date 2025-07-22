

import { useQuery } from '@tanstack/react-query'
import {fetchLogs, postNewWorkout} from '../api/newWorkout.ts'

export const useLogs = () => {
    return useQuery({
        queryKey: ['logs'],
        queryFn: fetchLogs,
    })
}


export const postWorkout = async () => {
    return useQuery({
        queryKey: ['logs'],
        queryFn: postNewWorkout,
    })
}

