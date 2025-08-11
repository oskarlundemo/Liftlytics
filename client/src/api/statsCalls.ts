



import { axiosInstance } from '../services/axios.ts'


type ExerciseParams = {
    exerciseName: string;
    exerciseId: string;
};

export const fetchStatsData = async () => {
    const res = await axiosInstance.get('/stats/fetch')
    return res.data
}


export const fetchExerciseStats = async ({ exerciseName, exerciseId }: ExerciseParams) => {
    const res = await axiosInstance.get(`/stats/entry/${encodeURIComponent(exerciseName)}/${encodeURIComponent(exerciseId)}`);
    return res.data;
};

export const getMonthVolume = async (date: Date) => {
    const res = await axiosInstance.get('/stats/monthlyVolume', {
        params: {
            date: date.toISOString(),
        },
    });
    return res.data;
};