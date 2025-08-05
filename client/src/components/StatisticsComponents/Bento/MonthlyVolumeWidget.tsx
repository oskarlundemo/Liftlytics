import { VolumeCard } from "./VolumeCard.tsx";
import { useStatsContext } from "../../../contexts/StatsContext.tsx";
import {useEffect, useState} from "react";
import {useVolumeDataLazy} from "../../../hooks/statsHook.ts";
import { PuffLoader} from "react-spinners";

type WeeklyVolumeProps = {
    boxIndex: number;
};

// @ts-ignore
export const MonthlyVolumeWidget = ({ boxIndex }: WeeklyVolumeProps) => {

    const { volumeData, setVolumeData } = useStatsContext();
    const [numberOfSets, setSetNumberOfSets] = useState<number | null>(volumeData.numberOfSets || 0);
    const [muscleGroupVolume, setMuscleGroupVolume] = useState<any | null>(volumeData.summary || []);

    const [headerDate, setHeaderDate] = useState<Date>(new Date());
    const { fetchVolumeData, data, isLoading, isPending, isError, error } = useVolumeDataLazy();


    useEffect(() => {
        if (data) {
            setVolumeData(data);
            setSetNumberOfSets(data.numberOfSets ?? 0);
            setMuscleGroupVolume(data.summary ?? []);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setVolumeData(data);
            setSetNumberOfSets(data.numberOfSets ?? 0);
            setMuscleGroupVolume(data.summary ?? []);
        }
    }, [data]);

    useEffect(() => {
        if (volumeData) {
            setSetNumberOfSets(volumeData.numberOfSets ?? 0);
            setMuscleGroupVolume(volumeData.summary ?? []);
        }
    }, [volumeData]);



    return (
        <div
            style={{
                gridArea: `box-${boxIndex}`,
            }}
            className={'weekly-volume widget'}
        >

            <div className="flex flex-row gap-5 justify-between p-5">

                <svg   onClick={() => setHeaderDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className={'hover-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>

                <h3 className={'widget-title whitespace-nowrap'}>
                    {headerDate.toLocaleString('default', { month: 'long' }).replace(/^\w/, c => c.toUpperCase()) + ' ' + headerDate.getFullYear()}
                </h3>

                <svg onClick={() => setHeaderDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className={'hover-svg'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </div>


            {isPending ? (
                <div className="flex flex-grow justify-center items-center">
                    <PuffLoader
                        size={100}
                        color={'cyan'}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                (isError ? (
                    <h4 style={{color: 'var(--color-error)', opacity: '0.5'}} className={'text-2xl m-auto text-center font-semibold'}>Error loading data</h4>
                ) : (
                <div className={'weekly-volume-wrapper'}>
                    {muscleGroupVolume.length > 0 ? (
                        muscleGroupVolume.map((item, index) => (
                            <VolumeCard
                                key={item.id}
                                sets={item.totalSets}
                                totalSets={numberOfSets}
                                muscleGroup={item.name}
                            />
                        ))
                    ) : (
                        <h4 style={{color: 'var(--color-text-muted)'}} className={'text-3xl m-auto text-center font-extrabold'}>No data yet</h4>
                    )}
                </div>
            ))
            )}



            <h4 style={{color: 'var(--color-text-muted)'}} className={'text-base text-center font-extrabold'}>Sets per muscle / month</h4>
        </div>
    );
};
