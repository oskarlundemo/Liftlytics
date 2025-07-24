import {axiosInstance} from "../services/axios.ts";


export const addUserToDB = async (workoutData:object) => {
    const res = await axiosInstance.post('/', workoutData);
    return res.data;
}