import {axiosInstance} from "../services/axios.ts";


export const syncUser = async (userData:object) => {
    const res = await axiosInstance.post('/authorization/sync-user', userData);
    return res.data;
}

export const deleteUser = async () => {
    const res = await axiosInstance.delete('/authorization/delete-user');
    return res.data;
}
