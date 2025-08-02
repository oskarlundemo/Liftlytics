import { axiosInstance } from '../services/axios.ts'

export const fetchCustomExercises = async () => {
    const res = await axiosInstance.get('exercises/custom/fetch')
    return res.data
}

export const deleteExercise = async (id:string) => {
    const res = await axiosInstance.delete(`exercises/custom/delete/${id}`)
    return res.data
}

export const updateCustomExercise = async ({id, categoryId, exercise, updatedName} : {id:string, categoryId:string, exercise:object, updatedName:string}) => {

    const res = await axiosInstance.post(`exercises/custom/update/${id}`, {
        categoryId,
        exercise,
        updatedName,
    });
    return res.data;
};