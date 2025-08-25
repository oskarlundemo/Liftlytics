import { Legend, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {useFetchDetails} from "../hooks/statsHook.ts";
import {LoadingPage} from "../components/MiscComponents/LoadingPage.tsx";
import {CustomTooltip} from "../components/MiscComponents/CustomToolTip.tsx";
import '../index.css'


/**
 * Purpose:
 * This page shows users their statistics for a specific exercise
 *
 * Key components:
 * <ResponsiveContainer> <LoadingPage>
 * Notes:
 * Using recharts.js for the graph
 *
 * @constructor
 */


export const ExerciseStats = ({}) => {

    const [exerciseData, setExerciseData] = useState<any>([]);
    const { 'exercise-name': exerciseName, 'exercise-id': exerciseId } = useParams();
    const [selectedReps, setSelectedReps] = useState<{ [repsKey: string]: any[] }>({});

    const {data, isLoading, error} = useFetchDetails(encodeURIComponent(exerciseName), encodeURIComponent(exerciseId))
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.data) {
            console.log(data?.data);
            setExerciseData(data?.data);
        }
    }, [data]);

    const lineColors = [
        getComputedStyle(document.documentElement).getPropertyValue('--chart-blue').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-orange').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-green').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-red').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-purple').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-brown').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-pink').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-gray').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-lime').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-cyan').trim(),
    ];

    const handleClick = (repsKey, repsData) => {
        setSelectedReps(prev => {
            const updated = { ...prev };
            if (updated[repsKey]) {
                delete updated[repsKey];
            } else {
                updated[repsKey] = repsData;
            }
            return updated;
        });
    }

    const allDates = Array.from(
        new Set(Object.values(selectedReps).flat().map(d => d.startDate))
    ).sort((a, b) => new Date(a) - new Date(b));

    return (
        <div className="exercise-stats-wrapper justify-center w-full h-full flex flex-col">
            <header className="w-full flex flex-row relative p-4">
                <svg
                    onClick={() => navigate('/statistics')}
                    className="hover-svg m-4 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                >
                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>

                <h1 className="text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                    {decodeURIComponent(exerciseName)}
                </h1>
            </header>

            <main style={{ maxWidth: 'var(--max-context-width)' }} className="m-auto flex flex-col w-full">
                {isLoading ? (
                    <LoadingPage />
                ) : exerciseData ? (
                    <div className="flex relative flex-col w-full align-middle justify-center">
                        <section style={{ flex: 1, minHeight: '300px' }}>

                            <ResponsiveContainer
                                className={'my-chart'}
                                width="100%"
                                height={400}
                                style={{ border: 'none', outline: 'none' }}>

                                <AreaChart>

                                    <XAxis
                                        axisLine={true}
                                        dataKey="startDate"
                                        type="category"
                                        ticks={allDates}
                                        interval={0}
                                        tickFormatter={(date) => {
                                            const d = new Date(date);
                                            return `${d.getDate()}/${d.getMonth() + 1}`;
                                        }}
                                    />

                                    <YAxis axisLine={true}  label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />

                                    <Tooltip
                                        content={<CustomTooltip/>}
                                    />

                                    <Legend />

                                    {Object.entries(selectedReps).map(([repsKey, data], index) => (
                                        <Area
                                            key={repsKey}
                                            type="monotone"
                                            data={data}
                                            dataKey="weight"
                                            stroke={lineColors[index % lineColors.length]}
                                            fill={lineColors[index % lineColors.length]}
                                            fillOpacity={0.3}
                                            name={`${repsKey} reps`}
                                        />
                                    ))}
                                </AreaChart>
                            </ResponsiveContainer>
                        </section>

                        {Object.keys(exerciseData).length === 0 && (

                            <div className="absolute top-1/2 left-1/2 flex flex-row gap-5 align-middle justify-center -translate-x-1/2 -translate-y-1/2" >
                                <h4
                                    style={{ color: 'var(--color-text-muted)'}}
                                    className="text-2xl"
                                >
                                    No data recorded yet
                                </h4>

                                <svg style={{fill: 'var(--color-text-muted)'}} className={'my-auto'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160v-440h160v440H160Zm240 0v-400l160 160v240H400Zm160-354L400-674v-126h160v286Zm240 240L640-434v-6h160v166Zm-9 219L55-791l57-57 736 736-57 57Z"/></svg>

                            </div>

                        )}

                        <div className="flex flex-row m-auto gap-5 p-5">
                            {Object.entries(exerciseData).map(([repsKey, repsData], index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        handleClick(repsKey, repsData);
                                    }}
                                    className={`button-intellij ${selectedReps[repsKey] ? 'active-button' : ''}`}
                                >
                                    {repsKey} reps
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h4 style={{ color: 'var(--color-text-muted)' }} className="flex align-middle m-auto text-color-muted">
                        Error loading data: {error.message || 'Server error'}
                    </h4>
                )}
            </main>
        </div>
    );
}