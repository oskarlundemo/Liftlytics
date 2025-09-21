-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('WEIGHT_REPS', 'WEIGHT_TIME', 'BODYWEIGHT_TIME', 'REPS');

-- CreateTable
CREATE TABLE "workout" (
    "id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "notes" TEXT,
    "body_weight" DOUBLE PRECISION,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workoutExcersizes" (
    "id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,
    "excersize_id" TEXT NOT NULL,

    CONSTRAINT "workoutExcersizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMetric" (
    "id" TEXT NOT NULL,
    "workoutExcersize_id" TEXT NOT NULL,
    "metricType" "MetricType" NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "time" DOUBLE PRECISION,

    CONSTRAINT "ExerciseMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strengthExcersize" (
    "id" TEXT NOT NULL,
    "musclegroup_id" TEXT NOT NULL,

    CONSTRAINT "strengthExcersize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "musclegroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "musclegroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workoutExcersizes" ADD CONSTRAINT "workoutExcersizes_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutExcersizes" ADD CONSTRAINT "workoutExcersizes_excersize_id_fkey" FOREIGN KEY ("excersize_id") REFERENCES "strengthExcersize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMetric" ADD CONSTRAINT "ExerciseMetric_workoutExcersize_id_fkey" FOREIGN KEY ("workoutExcersize_id") REFERENCES "workoutExcersizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strengthExcersize" ADD CONSTRAINT "strengthExcersize_musclegroup_id_fkey" FOREIGN KEY ("musclegroup_id") REFERENCES "musclegroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
