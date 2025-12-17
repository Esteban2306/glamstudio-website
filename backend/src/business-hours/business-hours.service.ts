import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBusinessHoursDto } from "./dto/create-business-hours.dto";
import { hhmmToMinutes } from "src/common/utils/time.utils";
import { rangesOverlap } from "src/common/utils/rangeOverlap";
import { PrismaService } from "src/prisma/prisma.service";
import { DayOfWeek } from "@prisma/client";

@Injectable()
export class BusinessHoursService {

    constructor(private prisma: PrismaService) {}

    async create (dto: CreateBusinessHoursDto) {
        const start = hhmmToMinutes(dto.startTime)
        const end = hhmmToMinutes(dto.endTime)

        if (start >= end) throw new BadRequestException('startTime must be earlier than endTime')

        const existing = await this.prisma.businessHours.findMany({
            where: {day: dto.day}
        })

        if(existing.some(e => rangesOverlap(start, end, e.startTime, e.endTime))){
            throw new ConflictException('Business hours overlap existing range')
        }

        return this.prisma.businessHours.create({
            data: {day: dto.day, startTime: start, endTime: end}
        })
        
    }

    async getAll() {
    return this.prisma.businessHours.findMany({ orderBy: [{ day: 'asc' }, { startTime: 'asc' }] });
    }

    async getByDay(day: DayOfWeek) {
    return this.prisma.businessHours.findMany({ where: { day }, orderBy: { startTime: 'asc' } });
    }

    async update(id: string, dto: Partial<CreateBusinessHoursDto>) {
        const exists = await this.prisma.businessHours.findUnique({where : {id}})

        if(!exists) throw new NotFoundException('Hour not found, please add valid data')

        const start = dto.startTime ? hhmmToMinutes(dto.startTime) : exists.startTime;
        const end = dto.endTime ? hhmmToMinutes(dto.endTime) : exists.endTime;
        const day = dto.day ?? exists.day;

        if(start >= end) throw new BadRequestException('invalid range, plase add valid range') 

        const overlaps = await this.prisma.businessHours.findMany({
            where: {day, NOT: {id}}
        })

        if (overlaps.some(e => rangesOverlap(start, end, e.startTime, e.endTime))) {
        throw new ConflictException('Overlap with other business hours');
        }

        return this.prisma.businessHours.update({ where: {id}, data: {startTime: start, endTime: end , day}})
    }

    async delete (id: string) {
        return this.prisma.businessHours.delete({where: {id}})
    }

}