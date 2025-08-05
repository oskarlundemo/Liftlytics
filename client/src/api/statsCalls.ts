



import { axiosInstance } from '../services/axios.ts'

export const fetchStatsData = async () => {
    const res = await axiosInstance.get('/stats/fetch')
    return res.data
}


export const getMonthVolume = async (date: Date) => {

    date = typeof dateInput === 'string' ? new Date(dateInput) : date;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid date passed to getMonthVolume');
    }

    const res = await axiosInstance.get('/stats/monthlyVolume', {
        params: {
            date: date.toISOString(),
        },
    });
    return res.data;
};