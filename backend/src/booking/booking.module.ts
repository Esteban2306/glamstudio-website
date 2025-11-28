import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';

@Module({
    controllers: [BookingController]
})
export class BookingModule { }
