

import '../../styles/LandingPage/Usps.css'
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";


export const ChartUsp = () => {

    const [showWeight, setShowWeight] = useState<boolean>(false);

    const repsData = [
        { date: '2025-08-01', r12: 120, r5: 150, r1: 200 },
        { date: '2025-08-03', r12: 118, r5: 153, r1: 202 },
        { date: '2025-08-05', r12: 122, r5: 158, r1: 207 },
        { date: '2025-08-07', r12: 116, r5: 162, r1: 210 },
        { date: '2025-08-09', r12: 121, r5: 168, r1: 208 },
        { date: '2025-08-11', r12: 119, r5: 165, r1: 212 },
        { date: '2025-08-13', r12: 123, r5: 170, r1: 215 }
    ];

    useEffect(() => {
        setTimeout(() => {
            setShowWeight(!showWeight);
        }, 5000)
    }, [showWeight]);


    return (
        <section className="chart-usp usp">

            <div className="text-container items-center flex w-1/2">
                <span className="mr-auto">3</span>
                <h2>Own Your Numbers</h2>
                <p>
                    Your body tells a story — track it all. From daily weigh-ins to strength milestones, see your
                    performance come to life in real-time data that keeps you motivated and accountable.
                </p>
            </div>


            <div className="motion-wrapper justify-between flex flex-col">


                <h3 style={{color: 'var(--color-text-muted)'}} className={'text-xl text-center font-semibold'}>Deadlift</h3>
                <AnimatePresence initial={false}>

                    <motion.div
                        className="motion w-full"
                        key="deadlift"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >

                        <div style={{ flex: 1, minHeight: '300px', height: '400px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={repsData}>

                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(dateStr) => {
                                            const date = new Date(dateStr);
                                            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
                                        }}
                                    />

                                    <YAxis
                                        label={{
                                            value: 'Weight (kg)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: 10,
                                            style: { textAnchor: 'middle', fill: '#555' }
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="r1"
                                        stroke="hsl(195, 100%, 75%)"
                                        name="1 rep"
                                        activeDot={false}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="r5"
                                        stroke="hsl(275, 50%, 55%)"
                                        name="5 reps"
                                        activeDot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="r12"
                                        stroke="hsl(275, 55%, 45%)"
                                        name="12 reps"
                                        activeDot={false}
                                    />

                                    <Legend />

                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );


}