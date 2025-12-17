import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ScheduleBlockController } from "./schedule-block.controller";
import { scheduleBlockService } from "./schedule-block.service";

@Module({
    imports: [PrismaModule],
    controllers: [ScheduleBlockController],
    providers: [scheduleBlockService],
    exports: [scheduleBlockService],
})
export class ScheduleBlockModule {}