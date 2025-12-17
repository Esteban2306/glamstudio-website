import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BusinessHoursService } from "./business-hours.service";
import { CreateBusinessHoursDto } from "./dto/create-business-hours.dto";
import { DayOfWeek } from "@prisma/client";
import { JwtGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminGuard } from "src/auth/guards/admin.guard";

@Controller('admin/business-hours')
export class BusinessHoursController {
  constructor (private service: BusinessHoursService) {}

  @UseGuards(JwtGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreateBusinessHoursDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get(':day')
  getByDay(@Param('day') day: DayOfWeek) {
    return this.service.getByDay(day);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateBusinessHoursDto>,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

}