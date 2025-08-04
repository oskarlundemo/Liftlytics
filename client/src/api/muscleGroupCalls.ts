

import {axiosInstance} from "../services/axios.ts";


export const fetchMuscleGroups = async () => {
    const res = await axiosInstance.get(`/muscle-groups/fetch`)
    return res.data
}


export const createCustomMuscleGroup = async (muscleGroupName:string) => {
    const res = await axiosInstance.post(`/muscle-groups/create`, {
        muscleGroupName,
    })
    return res.data
}


export const deleteCustomMuscleGroup = async (muscleGroupId:string) => {
    const res = await axiosInstance.delete(`/muscle-groups/delete/${muscleGroupId}`)
    return res.data
}