
import { axiosInstance } from '../services/axios.ts'

export const fetchLogs = async () => {
    const res = await axiosInstance.get('/logs')
    return res.data
}


export const postNewWorkout = async () => {
    const res = await axiosInstance.post('/logs/new')
    return res.data
}
