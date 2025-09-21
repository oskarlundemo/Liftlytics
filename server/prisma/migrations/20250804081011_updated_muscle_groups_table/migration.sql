-- AlterTable
ALTER TABLE "MuscleGroup" ADD COLUMN     "isDefault" BOOLEAN DEFAULT false,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "MuscleGroup" ADD CONSTRAINT "MuscleGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
