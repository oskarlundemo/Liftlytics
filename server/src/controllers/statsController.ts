import {AuthenticatedRequest} from "../middleware/supabase";
import {NextFunction, Response} from 'express';
import {prisma} from "../clients/prismaClient";
import {MuscleGroupObject} from '../classes/MuscleGroupObject'
import _ from 'lodash'


export const fetchCategories = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id;

        const muscleGroups = await prisma.muscleGroup.findMany({
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                    where: {
                        exercise: {
                            OR: [
                                { isDefault: true },
                                { userId: userId }
                            ]
                        }
                    }
                }
            }
        });

        res.locals.categories = muscleGroups;

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred when fetching categories.'
        })
    }
}


export const bestCompounds = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id;

        const compoundLifts = ['Squat', 'Bench press', 'Deadlift'];

        const best1RMs = await Promise.all(
            compoundLifts.map(async (liftName) => {
                return await prisma.workingSetData.findFirst({
                    where: {
                        reps: 1,
                        workoutExercise: {
                            exercise: {
                                name: liftName,
                                isDefault: true,
                                userId: null,
                            },
                            workout: {
                                userId: userId,
                            }
                        }
                    },
                    orderBy: {
                        weight: 'desc',
                    },
                    take: 1,
                    include: {
                        workoutExercise: {
                            include: {
                                workout: true,
                                exercise: true,
                            },
                        },
                    },
                });
            })
        );

        const formatted1RMs = best1RMs
            .filter(Boolean)
            .map(item => ({
                weight: item!.weight || 0,
                exercise: item!.workoutExercise.exercise.name || 'Undefined exercise',
                date: item!.workoutExercise.workout.startDate || null,
            }));


        res.locals.best1RMs = formatted1RMs;
        next();


    } catch (err:any) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'An error occured when fetching categories.',
            code: 500,
        })
    }
}




export const fetchEntryDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id;

        const {exerciseName, exerciseId} = req.params;

        if (!exerciseName || !exerciseId) {
            return res.status(400).json({
                status: 'error',
                message: 'Error! Insufficient parameters.'
            })
        }

        if (typeof exerciseName !== 'string' || typeof exerciseId !== 'string') {
            return res.status(400).json({
                status: 'error',
                message: 'Error! Parameters are in wrong format.',
            });
        }

        const isUsersCustomExercise = await prisma.strengthExercise.findUnique({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            }
        })

        let filteredExercises;

        if (isUsersCustomExercise) {
            filteredExercises = await prisma.workoutExercise.findMany({
                where: {
                    workout: {
                        userId: userId,
                    },
                    exercise: {
                        id: exerciseId,
                        userId: userId,
                        isDefault: false,
                    },
                },
                include: {
                    workout: true,
                    exercise: true,
                    metrics: true,
                },
            });
        } else {
            filteredExercises = await prisma.workoutExercise.findMany({
                where: {
                    workout: {
                        userId: userId,
                    },
                    exercise: {
                        id: exerciseId,
                        isDefault: true,
                    },
                },
                include: {
                    workout: true,
                    exercise: true,
                    metrics: true,
                },
            })
        }

        const allTheMetrics = filteredExercises.flatMap((exercise) => {
            return exercise.metrics.map((metric) => ({
                startDate: exercise.workout.startDate,
                weight: metric.weight,
                reps: metric.reps,
                bodyWeight: exercise.workout.bodyWeight,
            }));
        })


        const sortedMetrics = allTheMetrics.sort((a, b) => {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });


        const letGrouped = _.groupBy(sortedMetrics, 'reps');

        const bestEffortsByDay: { [key: string]: any } = {};

        for (const [reps, metrics] of Object.entries(letGrouped)) {

            metrics.forEach(metric => {
                const date = new Date(metric.startDate);
                const dayMonth = `${date.getDate()}/${date.getMonth() + 1}`;

                if (!bestEffortsByDay[dayMonth] || !metric.weight > !bestEffortsByDay[dayMonth].weight) {
                    bestEffortsByDay[dayMonth] = metric;
                }
            });
        }

        const formattedMetrics = Object.values(bestEffortsByDay).map(metric => ({
            startDate: metric.startDate,
            weight: metric.weight,
            bodyWeight: metric.bodyWeight,
            reps: metric.reps,
        }));

        let lastFormat = _.groupBy(formattedMetrics, 'reps');

        return res.status(200).json({
            status: 'success',
            data: lastFormat,
            message: 'Data for this exercise was fetched successfully.'
        })

    } catch (err:any) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'An error occured when fetching entry.',
        })
    }
}




export const fetchMuscleVolumeMonth = async (req:AuthenticatedRequest, res:Response) => {
    try {

        const dateParam = req.query.date;

        if (!dateParam) {
            return res.status(400).json({ status: 'error', message: 'Date query param missing' });
        }

        if (typeof dateParam !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Date query param must be a string' });
        }

        const userId = req.user.id;
        const month = new Date(dateParam);

        if (isNaN(month.getTime())) {
            return res.status(400).json({ status: 'error', message: 'Invalid date format' });
        }

        const startOfMonth = new Date(Date.UTC(month.getFullYear(), month.getMonth(), 1, 0, 0, 0, 0));
        const endOfMonth = new Date(Date.UTC(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999));

        const allUsersWorkout = await prisma.workout.findMany({
            where: {
                userId: userId,
                startDate: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                }
            },
            include: {
                exercises: {
                    include: {
                        metrics: true,
                        exercise: {
                            include: {
                                muscleGroups: {
                                    include: {
                                        muscleGroup: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        let numberOfSets = 0;

        for (const row of allUsersWorkout) {
            row.exercises.forEach((exercise: any) => {
                numberOfSets += exercise.metrics.length;
            });
        }

        let setsPerMuscleGroup = []

        for (const workout of allUsersWorkout) {

            for (const workoutExercise of workout.exercises) {
                const setCount = workoutExercise.metrics.length;
                for (const mg of workoutExercise.exercise.muscleGroups) {
                    setsPerMuscleGroup.push(new MuscleGroupObject(mg.muscleGroup.id, mg.muscleGroup.name, setCount));
                }
            }
        }

        const results = Object.groupBy(setsPerMuscleGroup, item => item.id);

        const summary = Object.entries(results).map(([id, group]) => {
            if (!group) {
                return { id, name: 'Unknown', totalSets: 0 };
            }
            const name = group[0]?.name ?? 'Unknown';
            const totalSets = group.reduce((sum, item) => sum + item.sets, 0);
            return { id, name, totalSets };
        });

        res.locals.weeklyVolume = {
            numberOfSets,
            allUsersWorkout,
            summary,
        }

        return res.status(200).json({ status: 'success', message: 'Successful fetch of volume', data: {numberOfSets, allUsersWorkout, summary,}});

    } catch (error) {
        console.error('Error in monthlyMuscleVolume:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong fetching weekly volume',
        });
    }
};



export const averageWorkoutDuration = async (req:AuthenticatedRequest, res:Response, next: NextFunction) => {

    try {

        const userId = req.user.id;
        const today = new Date();

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

        const workoutsThisMonth = await prisma.workout.findMany({
            where: {
                startDate: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
                endTime: {
                    not: null,
                },
                userId: userId,
            }
        })

        const allWorkouts = await prisma.workout.findMany({
            where: {
                endTime: {
                    not: null,
                },
                userId: userId,
            }
        })


        let sumOfTimeThisMonth = 0;
        let numberOfWorkoutsThisMonth = 0;

        let sumOfAllTime = 0;
        let totalNumberOfWorkouts = allWorkouts.length;

        for (let workout of workoutsThisMonth) {

            if (!workout.startTime || !workout.endTime)
                continue;

            numberOfWorkoutsThisMonth++;

            const startHours = workout.startTime.getHours();
            const endHours = workout.endTime.getHours();

            const startMinutes = workout.startTime.getMinutes();
            const endMinutes = workout.endTime.getMinutes();

            let startTotalMinutes = startHours * 60 + startMinutes;
            let endTotalMinutes = endHours * 60 + endMinutes;

            let durationMinutes = endTotalMinutes - startTotalMinutes;
            if (durationMinutes < 0) {
                durationMinutes += 1440;
            }

            sumOfTimeThisMonth += durationMinutes;
        }

        for (let workout of allWorkouts) {
            if (!workout.startTime || !workout.endTime)
                continue;

            if (!workout.startTime || !workout.endTime)
                continue;

            numberOfWorkoutsThisMonth++;

            const startHours = workout.startTime.getHours();
            const endHours = workout.endTime.getHours();

            const startMinutes = workout.startTime.getMinutes();
            const endMinutes = workout.endTime.getMinutes();

            let startTotalMinutes = startHours * 60 + startMinutes;
            let endTotalMinutes = endHours * 60 + endMinutes;

            let durationMinutes = endTotalMinutes - startTotalMinutes;
            if (durationMinutes < 0) {
                durationMinutes += 1440;
            }

            sumOfAllTime += durationMinutes;
        }

        const avgMinutesThisMonth = (sumOfTimeThisMonth / numberOfWorkoutsThisMonth);

        const averageOverAll = (sumOfAllTime / totalNumberOfWorkouts);

        res.locals.averageWorkoutDuration = {
            avgThisMonth: {
                avgMinutes: avgMinutesThisMonth,
                sumMinutes: sumOfAllTime
            },
            avgAllTime: {
                sumMinutes: sumOfAllTime,
                avgMinutes: averageOverAll,
            }
        };

        next();

    } catch (err:any) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred when fetching average workout.',
        })
    }
}


export const loadMuscleVolumeMonth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id;
        const today = new Date();

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

        const monthParam = req.query.month as string | undefined;

        const allUsersWorkout = await prisma.workout.findMany({
            where: {
                userId: userId,
                startDate: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                }
            },
            include: {
                exercises: {
                    include: {
                        metrics: true,
                        exercise: {
                            include: {
                                muscleGroups: {
                                    include: {
                                        muscleGroup: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });


        let numberOfSets = 0;

        for (const row of allUsersWorkout) {
            row.exercises.forEach((exercise: any) => {
                numberOfSets += exercise.metrics.length;
            });
        }

        let setsPerMuscleGroup = []

        for (const workout of allUsersWorkout) {
            for (const workoutExercise of workout.exercises) {
                const setCount = workoutExercise.metrics.length;
                for (const mg of workoutExercise.exercise.muscleGroups) {
                    setsPerMuscleGroup.push(new MuscleGroupObject(mg.muscleGroup.id, mg.muscleGroup.name, setCount));
                }
            }
        }

        const results = Object.groupBy(setsPerMuscleGroup, item => item.id);

        const summary = Object.entries(results).map(([id, group]) => {
            if (!group) {
                return { id, name: 'Unknown', totalSets: 0 };
            }
            const name = group[0]?.name ?? 'Unknown';
            const totalSets = group.reduce((sum, item) => sum + item.sets, 0);
            return { id, name, totalSets };
        });

        res.locals.weeklyVolume = {
            numberOfSets,
            allUsersWorkout,
            summary,
        }

        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong muscle volume'
        })
    }
}



export const workoutStreakData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    try {

        const userId = req.user.id;

        const usersWorkouts = await prisma.workout.findMany({
            where: {
                userId: userId,
            }
        })

        const allDatesSorted = usersWorkouts.map(w => new Date(w.startDate)).sort((a,b) => a.getTime() - b.getTime());

        let longestStreak = 0;
        let currentStreak = 0;

        for (let i = 1; i < allDatesSorted.length; i++) {

            const prevDay = new Date(allDatesSorted[i - 1]);
            const currentDay = new Date(allDatesSorted[i]);

            prevDay.setHours(0, 0, 0, 0);
            currentDay.setHours(0, 0, 0, 0);

            const diffInDays = Math.floor((currentDay.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24));

            if (diffInDays === 1) {
                currentStreak++;
            } else if (diffInDays > 1) {
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        }

        longestStreak = Math.max(longestStreak, currentStreak);

        res.locals.workoutStreakData = {
            longestStreak,
            currentStreak,
        }

        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went with the workout streak'
        })
    }
}



export const checkedCalenderData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id;

        const usersWorkoutDates = await prisma.workout.findMany({
            where: {
                userId: userId,

            }, select: {
                startDate: true
            }
        })

        res.locals.calenderData = usersWorkoutDates;

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went fetching the dates for the users calender'
        })
    }
}




export const bodyWeightData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id;

        const workouts = await prisma.workout.findMany({
            where: {
                userId: userId,
                bodyWeight: {not: null}
            }
        })

        const groupedByDate = _.groupBy(workouts, workout =>
            workout.startDate.toISOString().split('T')[0]
        );

        console.log(groupedByDate)

        const dataPoints = Object.entries(groupedByDate).map(([date, entries]) => {
            const latest = _.maxBy(entries, e => e.startDate);
            return {
                date: latest ? latest.startDate : null,
                bodyWeight: latest ? latest.bodyWeight : null
            };
        });


        res.locals.bodyWeightData = dataPoints;
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong querying the body weight data'
        })
    }
}



export const sendWidgetStats = async (req: AuthenticatedRequest, res: Response) => {

    try {

        res.status(200).json({
            weeklyVolumeData: res.locals.weeklyVolume,
            categories: res.locals.categories,
            workoutStreakData: res.locals.workoutStreakData,
            best1RMs: res.locals.best1RMs,
            bodyWeightData: res.locals.bodyWeightData,
            averageDuration: res.locals.averageWorkoutDuration,
            calenderData: res.locals.calenderData,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong organizing the widget data'
        })
    }

}