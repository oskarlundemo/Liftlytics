/*
  Warnings:

  - You are about to drop the column `workoutExcersize_id` on the `ExerciseMetric` table. All the data in the column will be lost.
  - You are about to drop the `musclegroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `strengthExcersize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workoutExcersizes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workoutExerciseId` to the `ExerciseMetric` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseMetric" DROP CONSTRAINT "ExerciseMetric_workoutExcersize_id_fkey";

-- DropForeignKey
ALTER TABLE "strengthExcersize" DROP CONSTRAINT "strengthExcersize_musclegroup_id_fkey";

-- DropForeignKey
ALTER TABLE "workoutExcersizes" DROP CONSTRAINT "workoutExcersizes_excersize_id_fkey";

-- DropForeignKey
ALTER TABLE "workoutExcersizes" DROP CONSTRAINT "workoutExcersizes_workout_id_fkey";

-- AlterTable
ALTER TABLE "ExerciseMetric" DROP COLUMN "workoutExcersize_id",
ADD COLUMN     "workoutExerciseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "musclegroup";

-- DropTable
DROP TABLE "strengthExcersize";

-- DropTable
DROP TABLE "workout";

-- DropTable
DROP TABLE "workoutExcersizes";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "notes" TEXT,
    "bodyWeight" DOUBLE PRECISION,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrengthExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "StrengthExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMuscleGroup" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "muscleGroupId" TEXT NOT NULL,

    CONSTRAINT "ExerciseMuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_UserToWorkout_B_index" ON "_UserToWorkout"("B");

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "StrengthExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMetric" ADD CONSTRAINT "ExerciseMetric_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrengthExercise" ADD CONSTRAINT "StrengthExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "StrengthExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkout" ADD CONSTRAINT "_UserToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWorkout" ADD CONSTRAINT "_UserToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
