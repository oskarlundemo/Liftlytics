import {AuthenticatedRequest} from "../middleware/supabase";
import {NextFunction, Response} from 'express';
import {prisma} from "../clients/prismaClient";
import {MuscleGroupObject} from '../classes/MuscleGroupObject'
import _ from 'lodash'

/**
 * 1. What does the function do?
 *    This function fetches all the categories that a user can browse in
 *
 * 2. What inputs does it expect?
 *    The user needs to pass their token
 *
 * 3. What outputs or results does it return?
 *    An array of muscle groups that are added to the res object and eventually sent to the front-end
 */



export const fetchCategories = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // Id of the user

        // Find the muscle groups
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

        res.locals.categories = muscleGroups; // Add it to the res, and move to the next function in the middleware

        next(); // Next

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred when fetching categories.'
        })
    }
}

/**
 * 1. What does the function do?
 *    It retrieves the best compound lifts of the user
 *
 * 2. What inputs does it expect?
 *    The token of the user
 *
 * 3. What outputs or results does it return?
 *    It adds the best 1 RMS (1 Rep Maxes) to the res object before going to the next function in the middleware
 */



export const bestCompounds = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // Id of the user

        const compoundLifts = ['Squat', 'Bench press', 'Deadlift']; // The name of the compound exercises

        // For each name in the compound lifts, fetch the associated data
        const best1RMs = await Promise.all(
            compoundLifts.map(async (liftName) => {
                return prisma.workingSetData.findFirst({
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

        // Reformat the data to the bare minimum
        const formatted1RMs = best1RMs
            .filter(Boolean)
            .map(item => ({
                weight: item!.weight || 0,
                exercise: item!.workoutExercise.exercise.name || 'Undefined exercise',
                date: item!.workoutExercise.workout.startDate || null,
            }));


        // Append to the res
        res.locals.best1RMs = formatted1RMs;
        next(); // Next function in the middleware

    } catch (err:any) {
        console.error(err); // Log error
        res.status(500).json({
            status: 'error',
            message: 'An error occurred when fetching best compound lifts',
            code: 500,
        })
    }
}


/**
 * 1. What does the function do?
 *    It returns all the associated data ex. weight and reps for a specific exercise
 *
 * 2. What inputs does it expect?
 *    It expects the user to pass their token, the name and id from the request parameters
 *
 * 3. What outputs or results does it return?
 *    Returns an array with all the data
 */


export const fetchEntryDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // Id of the user

        const {exerciseName, exerciseId} = req.params; // Name of the exercise and id

        // If either are missing, return
        if (!exerciseName || !exerciseId) {
            return res.status(400).json({
                status: 'error',
                message: 'Error! Insufficient parameters.'
            })
        }

        // Make sure they are the correct data type
        if (typeof exerciseName !== 'string' || typeof exerciseId !== 'string') {
            return res.status(400).json({
                status: 'error',
                message: 'Error! Parameters are in wrong format.',
            });
        }

        // Check if the exercise is created by the user
        const isUsersCustomExercise = await prisma.strengthExercise.findUnique({
            where: {
                id: exerciseId,
                userId: userId,
                isDefault: false,
            }
        })

        let filteredExercises;

        // If users custom exercise
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

        // Extract the necessary data from the array
        const allTheMetrics = filteredExercises.flatMap((exercise) => {
            return exercise.metrics.map((metric) => ({
                startDate: exercise.workout.startDate,
                weight: metric.weight,
                reps: metric.reps,
                bodyWeight: exercise.workout.bodyWeight,
            }));
        })

        // Sort it by date
        const sortedMetrics = allTheMetrics.sort((a, b) => {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        });


        // Group it by reps
        const letGrouped = _.groupBy(sortedMetrics, 'reps');

        // Only return the best effort for one day
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

        // Extract the best efforts for each day
        const formattedMetrics = Object.values(bestEffortsByDay).map(metric => ({
            startDate: metric.startDate,
            weight: metric.weight,
            bodyWeight: metric.bodyWeight,
            reps: metric.reps,
        }));

        // Group it by reps
        let lastFormat = _.groupBy(formattedMetrics, 'reps');

        // Successfull!
        return res.status(200).json({
            status: 'success',
            data: lastFormat,
            message: 'Data for this exercise was fetched successfully.'
        })

    } catch (err:any) {
        console.error(err); // Log error
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred when fetching entry.',
        })
    }
}

/**
 * 1. What does the function do?
 *    It fetches the volume (number of sets / total number of sets) for each muscle group in a month
 *
 * 2. What inputs does it expect?
 *    The date needs to be passed in the parameters and the token in the id
 *
 * 3. What outputs or results does it return?
 *    It appends the results to the res object and then continues to the next function in the middleware
 *
 */

export const fetchVolumeMonthSpecific = async (req:AuthenticatedRequest, res:Response) => {
    try {

        const dateParam = req.query.date; // Extract the date
        const userId = req.user.id; // Id of the user

        // If there is no date, return
        if (!dateParam) {
            return res.status(400).json({ status: 'error', message: 'Date query param missing' });
        }

        // If the data is not of type string, return
        if (typeof dateParam !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Date query param must be a string' });
        }

        const month = new Date(dateParam);

        // If we cant convert the date to a month, return
        if (isNaN(month.getTime())) {
            return res.status(400).json({ status: 'error', message: 'Invalid date format' });
        }


        const startOfMonth = new Date(Date.UTC(month.getFullYear(), month.getMonth(), 1, 0, 0, 0, 0)); // Get the first day of the month
        const endOfMonth = new Date(Date.UTC(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999)); // Get the last day of the month


        // Search in the data from the starting point and end point
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

        // Count the total number of sets
        let numberOfSets = 0;

        // For each set, add it to the sum
        for (const row of allUsersWorkout) {
            row.exercises.forEach((exercise: any) => {
                numberOfSets += exercise.metrics.length;
            });
        }

        // Keep track of each set per muscle group
        let setsPerMuscleGroup = []

        // For each workout and exercise, extract the muscle group into a new object and parse the data
        for (const workout of allUsersWorkout) {
            for (const workoutExercise of workout.exercises) {
                const setCount = workoutExercise.metrics.length;
                for (const mg of workoutExercise.exercise.muscleGroups) {
                    setsPerMuscleGroup.push(new MuscleGroupObject(mg.muscleGroup.id, mg.muscleGroup.name, setCount));
                }
            }
        }

        // Group the results by id
        const results = Object.groupBy(setsPerMuscleGroup, item => item.id);

        // Reformat the data to ex: Back 10 100
        const summary = Object.entries(results).map(([id, group]) => {
            if (!group) {
                return { id, name: 'Unknown', totalSets: 0 };
            }
            const name = group[0]?.name ?? 'Unknown';
            const totalSets = group.reduce((sum, item) => sum + item.sets, 0);
            return { id, name, totalSets };
        });

        // Send the data to
        return res.status(200).json({
            status: 'success',
            message: 'Successful fetch of volume',
            data: {numberOfSets, allUsersWorkout, summary,}
        });

    } catch (error:any) {
        // Log error
        console.error('Error while retrieving monthly volume:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong fetching monthly volume',
        });
    }
};


/**
 * 1. What does the function do?
 *    Calculates the average workout duration of a month
 *
 * 2. What inputs does it expect?
 *    The token from the user
 *
 * 3. What outputs or results does it return?
 *    An object that is appended to the res object and then on to the next middleware function
 */



export const averageWorkoutDuration = async (req:AuthenticatedRequest, res:Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // Get the id of the user
        const today = new Date(); // Create a date object that will be used to check the current month


        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Check the start of the month
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999); // Check the end date of the month


        // Fetch all the workouts this month
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

        // Overall average
        const allWorkouts = await prisma.workout.findMany({
            where: {
                endTime: {
                    not: null,
                },
                userId: userId,
            }
        })


        let sumOfTimeThisMonth = 0; // Average this month
        let numberOfWorkoutsThisMonth = 0;

        let sumOfAllTime = 0;  // Average of all time
        let totalNumberOfWorkouts = allWorkouts.length;

        // For each workout
        for (let workout of workoutsThisMonth) {

            // If there is no start or ending time, return
            if (!workout.startTime || !workout.endTime)
                continue;

            numberOfWorkoutsThisMonth++;

            const startHours = workout.startTime.getHours(); // Get the hour
            const endHours = workout.endTime.getHours(); // Get the hour

            const startMinutes = workout.startTime.getMinutes(); // Get the minutes
            const endMinutes = workout.endTime.getMinutes(); // Get the minutes

            let startTotalMinutes = startHours * 60 + startMinutes; // Total of minutes
            let endTotalMinutes = endHours * 60 + endMinutes; // Total of minutes

            let durationMinutes = endTotalMinutes - startTotalMinutes; // Duration

            // Check if the exercise stretches over midnight
            if (durationMinutes < 0) {
                durationMinutes += 1440;
            }

            sumOfTimeThisMonth += durationMinutes;
        }

        // Same for all the workouts
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

        const avgMinutesThisMonth = (sumOfTimeThisMonth / numberOfWorkoutsThisMonth); // Avg duration this month

        const averageOverAll = (sumOfAllTime / totalNumberOfWorkouts); // Avg duration of all time

        // Add it to the res object
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

        next(); // Next middleware function

    } catch (err:any) {
        console.error(err); // Log the error
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred when calculating average workout duration.',
        })
    }
}

/**
 * 1. What does the function do?
 *    It loads the muscle volume of the current month
 *
 * 2. What inputs does it expect?
 *    The user needs to pass their token
 *
 * 3. What outputs or results does it return?
 *    It adds an array of data the res object before continuing with the next middleware function
 */

export const loadMuscleVolumeMonth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // ID of user
        const today = new Date(); // New date object to compare to

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);  // First day of month
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999); // Last day of month

        // Fetch all the workouts
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

        // For each workout
        for (const workout of allUsersWorkout) {
            workout.exercises.forEach((exercise: any) => {
                numberOfSets += exercise.metrics.length;
            });
        }

        let setsPerMuscleGroup = []

        // For each workout and exercise, add the muscle group
        for (const workout of allUsersWorkout) {
            for (const workoutExercise of workout.exercises) {
                const setCount = workoutExercise.metrics.length;
                for (const mg of workoutExercise.exercise.muscleGroups) {
                    setsPerMuscleGroup.push(new MuscleGroupObject(mg.muscleGroup.id, mg.muscleGroup.name, setCount));
                }
            }
        }

        // Group by id
        const results = Object.groupBy(setsPerMuscleGroup, item => item.id);

        // Reformat
        const summary = Object.entries(results).map(([id, group]) => {
            if (!group) {
                return { id, name: 'Unknown', totalSets: 0 };
            }
            const name = group[0]?.name ?? 'Unknown';
            const totalSets = group.reduce((sum, item) => sum + item.sets, 0);
            return { id, name, totalSets };
        });

        // Successful! Add it to the res and continue
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
            message: 'Something went wrong loading muscle volume'
        })
    }
}


/**
 * 1. What does the function do?
 *    Calculates the workout streak of the user
 *
 * 2. What inputs does it expect?
 *    The token from the user
 *
 * 3. What outputs or results does it return?
 *    It adds the data (an object) to the res then continues with the next middleware
 */


export const workoutStreakData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {


    try {

        const userId = req.user.id; // Token from user

        // Find many workouts
        const usersWorkouts = await prisma.workout.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                startDate: 'asc'
            }
        })

        console.log(usersWorkouts);

        for (const workout of usersWorkouts) {
            console.log(workout.startDate);
        }

        let longestStreak = 0; // Their longest streak
        let currentStreak = 0; // Their current streak

        for (let i = 1; i < usersWorkouts.length; i++) {

            const prevDay = new Date(usersWorkouts[i - 1].startDate); // Check the previous day
            const currentDay = new Date(usersWorkouts[i].startDate); // Check the next day

            prevDay.setHours(0, 0, 0, 0);
            currentDay.setHours(0, 0, 0, 0);

            const diffInDays = Math.floor((currentDay.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24));

            // If the diff is one day, increment
            if (diffInDays === 1) {
                currentStreak++;
            } else if (diffInDays > 1) { // The differance is longer than two days, streak is over
                longestStreak = Math.max(longestStreak, currentStreak);
                currentStreak = 1;
            }
        }

        longestStreak = Math.max(longestStreak, currentStreak);  // What is the longest

        // Successful!
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


/**
 * 1. What does the function do?
 *    It retrieves all the data for the calendar UI, marking each workout as completed
 *
 * 2. What inputs does it expect?
 *    The token from the user
 *
 * 3. What outputs or results does it return?
 *    It adds the data (an object) to the res then continues with the next middleware
 */



export const calendarData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // Id of the user

        // Find many workouts from the user
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

/**
 * 1. What does the function do?
 *    Fetches the body weight of the user
 *
 * 2. What inputs does it expect?
 *    The token from the user
 *
 * 3. What outputs or results does it return?
 *    It adds the data (an array) to the res then continues with the next middleware
 */


export const bodyWeightData = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        const userId = req.user.id; // Id of the user


        // Find many workouts
        const workouts = await prisma.workout.findMany({
            where: {
                userId: userId,
                bodyWeight: {not: null}
            }
        })

        // Group them by date
        const groupedByDate = _.groupBy(workouts, workout =>
            workout.startDate.toISOString().split('T')[0]
        );

        // For each data point, extract the body weight
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


/**
 * 1. What does the function do?
 *    Ties all the middleware together and sends a unified response to the front-end
 *
 * 2. What inputs does it expect?
 *    The passed inputs from each middleware function
 *
 * 3. What outputs or results does it return?
 *    It returns an object with all the data that has been appended by each middleware function
 */


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