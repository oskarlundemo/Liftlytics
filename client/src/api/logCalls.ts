
import { axiosInstance } from '../services/axios.ts'

export const fetchLogs = async () => {
    const res = await axiosInstance.get('/logs/fetch')
    return res.data
}


export const postNewWorkout = async (workoutData:object) => {
    const res = await axiosInstance.post('/logs/new', workoutData);
    return res.data;
}


export const updateWorkout = async (workoutData:object, id:string) => {
    const res = await axiosInstance.post(`/logs/update/${id}`, workoutData);
    return res.data;
}


export const fetchExerciseCategories = async () => {
    const res = await axiosInstance.get('/logs/exercises/categories')
    return res.data
}

export const deleteExerciseLog = async (id:string) => {
    const res = await axiosInstance.delete(`/logs/delete/${id}`)
    return res.data
}


export const getLogById = async (id: string) => {
    const res = await axiosInstance.get(`/logs/fetch/log/${id}`)
    return res.data
}


export const searchForExercise = async (query: string) => {
    if (!query || query.trim() === '') {
        return [];
    }

    try {
        const res = await axiosInstance.get('logs/fetch/search', {
            params: {
                query: query.trim(),
            },
        });
        return res.data || [];
    } catch (error) {
        console.error('Error searching for exercises:', error);
        return [];
    }
};