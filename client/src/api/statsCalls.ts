



import { axiosInstance } from '../services/axios.ts'

export const fetchStatsData = async () => {
    const res = await axiosInstance.get('/stats/fetch')
    return res.data
}