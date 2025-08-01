



import { axiosInstance } from '../services/axios.ts'

export const fetchCustomExercises = async () => {
    const res = await axiosInstance.get('exercises/custom/fetch')
    return res.data
}




