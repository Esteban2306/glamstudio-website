import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('/booking')

export class BookingController {

    @Get('/booking?date=YYYY-MM-DD')
    GetBookingsByDate() {
        return 'Bookings for the date'
    }

    @Get('/booking?status=pending')
    GetPendingBookings() {
        return 'Pending bookings'
    }

    @Post('/api/bookings')
    createBooking() {
        return 'Booking created!'
    }

    @Post('api/bookings/:id/confirmation')
    uploadBookingConfirmation() {
        return 'Booking confirmation uploaded!'
    }

    @Patch()
    cancelBooking() {
        return 'Booking cancelled!'
    }

    @Patch()
    confirmBooking() {
        return 'Booking confirmed!'
    }


}