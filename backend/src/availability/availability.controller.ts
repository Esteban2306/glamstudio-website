import { Controller, Get, Query } from "@nestjs/common";
import { AvailabilityService } from "./availability.service";
import { da } from "date-fns/locale";



@Controller('availability')
export class AvailabilityController {
    constructor(private service: AvailabilityService) {}
    @Get()
    getSlots (
        @Query('date') date: string,
        @Query('serviceDuration') duration: number,
    ) {
        return this.service.getAvailableSlots(date, duration)
    }
}