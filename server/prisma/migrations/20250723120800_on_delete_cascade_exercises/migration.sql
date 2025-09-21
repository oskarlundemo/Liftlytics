-- DropForeignKey
ALTER TABLE "ExerciseMuscleGroup" DROP CONSTRAINT "ExerciseMuscleGroup_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseMuscleGroup" ADD CONSTRAINT "ExerciseMuscleGroup_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "StrengthExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
