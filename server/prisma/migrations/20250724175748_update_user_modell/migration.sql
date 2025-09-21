/*
  Warnings:

  - You are about to drop the `_UserToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserToWorkout" DROP CONSTRAINT "_UserToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkout" DROP CONSTRAINT "_UserToWorkout_B_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserToWorkout";

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
