import {AuthenticatedRequest} from "../middleware/supabase";
import {Response, Request, NextFunction} from 'express';
import {prisma} from "../clients/prismaClient";
import {MuscleGroupObject} from '../classes/MuscleGroupObject'


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
            message: 'An error occured when fetching categories.'
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
            .filter(Boolean) // optional: removes nulls
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






export const fetchMuscleVolumeMonth = async (req:AuthenticatedRequest, res:Response) => {
    try {

        const dateParam = req.query.date;
        console.log(dateParam);
        console.log('I test volume');

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

        console.log('startOfMonth:', startOfMonth.toISOString());
        console.log('endOfMonth:', endOfMonth.toISOString());


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


        return res.status(200).json({ status: 'success', message: 'Successful fetch of volume', data: {
            numberOfSets, allUsersWorkout, summary,
            }});


    } catch (error) {
        console.error('Error in monthlyMuscleVolume:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong fetching weekly volume',
        });
    }
};





export const monthlyMuscleVolume = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


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
        let currentStreak = 1;

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




export const bodyWeightData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    try {

        let dataPoints: any[] = [];

        const userId = req.user.id;

        const workouts = await prisma.workout.findMany({
            where: {
                userId: userId,
                bodyWeight: {not: null}
            }
        })

        workouts.forEach(workout => {
            dataPoints.push({
                date: workout.startDate,
                bodyWeight: workout.bodyWeight,
            })
        })

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
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong organizing the widget data'
        })
    }

}