import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { scheduleBlockService } from "./schedule-block.service";
import { CreateScheduleBlockDto } from "./dto/create-schedule-block.dto";
import { JwtGuard } from "src/auth/guards/jwt-auth.guard"; 
import { AdminGuard } from "src/auth/guards/admin.guard";

@Controller('admin/schedule-blocks')
export class ScheduleBlockController {
    constructor(private service: scheduleBlockService) {}
 
  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreateScheduleBlockDto) {
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