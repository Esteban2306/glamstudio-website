import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOverrideHoursDto } from "./dto/create-override-hours.dto";
import { localDateToUtc } from "src/common/utils/date.utils";
import { hhmmToMinutes } from "src/common/utils/time.utils";

@Injectable()
export class OverrideHoursService {
    constructor(private prisma:PrismaService) {}

    async create (dto: CreateOverrideHoursDto) {
        const dateOnly = localDateToUtc(dto.date)
        const start = hhmmToMinutes(dto.startTime)
        const end = hhmmToMinutes(dto.endTime)

        if (start >= end ) throw new BadRequestException('Invalid value')

        const existing = await this.prisma.overrideHours.findMany({where: {date: dateOnly}})
        if(existing.length > 0)throw new ConflictException('Override for that day already exists');

        return this.prisma.overrideHours.create({
            data: {
                date: dateOnly,
                startTime: start,
                endTime: end
            }
        })
    }

    async getByDate(date: string) {
        const d = localDateToUtc(date);
        return this.prisma.overrideHours.findMany({ where: { date: d }});
    }

    async delete(id: string) {
        return this.prisma.overrideHours.delete({ where: { id }});
    }
}