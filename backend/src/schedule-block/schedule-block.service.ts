import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateScheduleBlockDto } from "./dto/create-schedule-block.dto";
import { hhmmToMinutes } from "src/common/utils/time.utils";
import { rangesOverlap } from "src/common/utils/rangeOverlap";
import { localDateToUtc } from "src/common/utils/date.utils";

@Injectable()
export class scheduleBlockService {
    constructor(private prisma: PrismaService) {}

    async create (dto: CreateScheduleBlockDto) {
        const dateOnly = localDateToUtc(dto.date);
        let start: number | undefined
        let end: number | undefined

        if (dto.startTime && dto.endTime) {
            start = hhmmToMinutes(dto.startTime)
            end = hhmmToMinutes(dto.endTime)
            if (start >= end) throw new BadRequestException('Invalid block range');
        } else {

        }

        const existing = await this.prisma.scheduleBlock.findMany({where: {date: dateOnly}})

        if(start != null && end != null){
            if(existing.some(b => (b.startTime == null ) || rangesOverlap(start!, end!, b.startTime!, b.endTime!))){
                throw new ConflictException('Overlaps existing block')
            }
        } else {
            if (existing.length > 0) throw new ConflictException('Day already has blocks');
        }

        return this.prisma.scheduleBlock.create({
            data: {
                date: dateOnly,
                startTime: start,
                endTime: end,
                reason: dto.reason 
            }
        })
    }

    async getByDate (date: string) {
        const d = localDateToUtc(date)
        return this.prisma.scheduleBlock.findMany({
            where: {date: d},
            orderBy: {startTime : 'asc'}
        })
    }

    async delete (id:string) {
        return this.prisma.scheduleBlock.delete({where: {id}})
    }
}