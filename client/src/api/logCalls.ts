
import { axiosInstance } from '../services/axios.ts'

export const fetchLogs = async () => {
    const res = await axiosInstance.get('/logs/fetch')
    return res.data
}


export const postNewWorkout = async (workoutData:object) => {
    const res = await axiosInstance.post('/logs/new', workoutData);
    return res.data;
}