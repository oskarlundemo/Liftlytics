/*
  Warnings:

  - You are about to drop the `ExerciseMetric` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseMetric" DROP CONSTRAINT "ExerciseMetric_workoutExerciseId_fkey";

-- DropTable
DROP TABLE "ExerciseMetric";

-- CreateTable
CREATE TABLE "WorkingSetData" (
    "id" TEXT NOT NULL,
    "workoutExerciseId" TEXT NOT NULL,
    "notes" TEXT,
    "metricType" "MetricType" NOT NULL,
    "weight" DOUBLE PRECISION,
    "reps" INTEGER,
    "time" DOUBLE PRECISION,

    CONSTRAINT "WorkingSetData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkingSetData" ADD CONSTRAINT "WorkingSetData_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
