/*
  Warnings:

  - You are about to drop the column `bookindId` on the `TransactionProof` table. All the data in the column will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lashistId,day]` on the table `BusinessHours` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lashistId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lashistId` to the `BusinessHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `TransactionProof` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'LASHIST';

-- DropForeignKey
ALTER TABLE "TransactionProof" DROP CONSTRAINT "TransactionProof_bookindId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "lashistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BusinessHours" ADD COLUMN     "lashistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OverrideHours" ADD COLUMN     "lashistId" TEXT;

-- AlterTable
ALTER TABLE "ScheduleBlock" ADD COLUMN     "lashistId" TEXT;

-- AlterTable
ALTER TABLE "TransactionProof" DROP COLUMN "bookindId",
ADD COLUMN     "bookingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "Lashist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lashist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LashistCategory" (
    "id" TEXT NOT NULL,
    "lashistId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "LashistCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lashist_userId_key" ON "Lashist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LashistCategory_lashistId_categoryId_key" ON "LashistCategory"("lashistId", "categoryId");

-- CreateIndex
CREATE INDEX "Booking_lashistId_date_startTime_idx" ON "Booking"("lashistId", "date", "startTime");

-- CreateIndex
CREATE INDEX "BusinessHours_lashistId_day_idx" ON "BusinessHours"("lashistId", "day");

-- CreateIndex
CREATE INDEX "BusinessHours_day_startTime_idx" ON "BusinessHours"("day", "startTime");

-- CreateIndex
CREATE INDEX "BusinessHours_day_endTime_idx" ON "BusinessHours"("day", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessHours_lashistId_day_key" ON "BusinessHours"("lashistId", "day");

-- CreateIndex
CREATE INDEX "ScheduleBlock_lashistId_date_idx" ON "ScheduleBlock"("lashistId", "date");

-- AddForeignKey
ALTER TABLE "Lashist" ADD CONSTRAINT "Lashist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LashistCategory" ADD CONSTRAINT "LashistCategory_lashistId_fkey" FOREIGN KEY ("lashistId") REFERENCES "Lashist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LashistCategory" ADD CONSTRAINT "LashistCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_lashistId_fkey" FOREIGN KEY ("lashistId") REFERENCES "Lashist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionProof" ADD CONSTRAINT "TransactionProof_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleBlock" ADD CONSTRAINT "ScheduleBlock_lashistId_fkey" FOREIGN KEY ("lashistId") REFERENCES "Lashist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessHours" ADD CONSTRAINT "BusinessHours_lashistId_fkey" FOREIGN KEY ("lashistId") REFERENCES "Lashist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverrideHours" ADD CONSTRAINT "OverrideHours_lashistId_fkey" FOREIGN KEY ("lashistId") REFERENCES "Lashist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
