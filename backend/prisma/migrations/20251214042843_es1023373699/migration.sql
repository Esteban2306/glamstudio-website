/*
  Warnings:

  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "endTime" INTEGER NOT NULL,
ADD COLUMN     "startTime" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_date_startTime_idx" ON "Booking"("date", "startTime");

-- CreateIndex
CREATE INDEX "Booking_date_endTime_idx" ON "Booking"("date", "endTime");
