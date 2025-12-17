import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OverrideHoursService } from "./override-hours.service";
import { CreateOverrideHoursDto } from "./dto/create-override-hours.dto";
import { JwtGuard } from "src/auth/guards/jwt-auth.guard"; 
import { AdminGuard } from "src/auth/guards/admin.guard";

@Controller('admin/override-hours')
export class OverrideHoursController {
    constructor (private service: OverrideHoursService) {}

    @UseGuards(JwtGuard, AdminGuard)
    @Post()
    create(@Body() dto: CreateOverrideHoursDto) {
        return this.service.create(dto);
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Get(':date')
    getByDate(@Param('date') date: string) {
        return this.service.getByDate(date);
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

}