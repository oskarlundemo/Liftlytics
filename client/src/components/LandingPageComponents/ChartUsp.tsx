

import '../../styles/LandingPage/Usps.css'
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


export const ChartUsp = () => {


    const [showWeight, setShowWeight] = useState<boolean>(false);


    const weightData = [
        { date: '2025-08-01', weight: 60.4 },
        { date: '2025-08-04', weight: 74.1 },
        { date: '2025-08-07', weight: 66.8 },
        { date: '2025-08-10', weight: 71.5 },
        { date: '2025-09-13', weight: 80.3 },
        { date: '2025-09-13', weight: 59.3 }
    ];

    const areaColor = [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim(),
    ];


    return (
        <section className="chart-usp usp">

            <div className="text-container items-center flex w-1/2">
                <span className={'mr-auto'}>2</span>

                <h2>Own Your Numbers</h2>

                <p>
                    Your body tells a story — track it all. From daily weigh-ins to strength milestones, see your
                    performance come to life in real-time data that keeps you motivated and accountable.
                </p>
            </div>


            <div className={'motion-wrapper overflow-hidden'}>
            <AnimatePresence initial={false}>
                {showWeight ? (
                    <motion.div
                        className="motion"
                        key="login"
                        initial={{ x: 0, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div style={{ flex: 1, minHeight: '300px', height: '400px' }}>
                            <ResponsiveContainer className={'outline-0'} width="100%" height="100%">
                                <AreaChart data={weightData}>
                                    <XAxis dataKey="date"
                                           tickFormatter={(dateStr) => {
                                               const date = new Date(dateStr);
                                               const day = date.getDate();
                                               const month = date.toLocaleString('default', { month: 'short' });
                                               return `${day} ${month}`;
                                           }}
                                    />
                                    <YAxis
                                        label={{
                                            value: 'Body weight (kg)',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: 10,
                                            style: { textAnchor: 'middle', fill: '#555' }
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="weight"
                                        stroke={areaColor}
                                        fill={areaColor}
                                        activeDot={false }
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="motion w-1/2 h-full"
                        custom={showWeight}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <p  onClick={() => setShowWeight(true)}>Reps</p>
                    </motion.div>
                )}
            </AnimatePresence>

            </div>

            <button className={'button-intellij'} onClick={() => setShowWeight(!showWeight)}>Animate</button>


        </section>
    );

}