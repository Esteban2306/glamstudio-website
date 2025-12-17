import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailabilityService } from 'src/availability/availability.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService, AvailabilityService],
})
export class BookingModule {}
