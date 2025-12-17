import { Module } from "@nestjs/common";
import { BusinessHoursController } from "./business-hours.controller";
import { BusinessHoursService } from "./business-hours.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [BusinessHoursController],
    providers: [BusinessHoursService],
    exports: [BusinessHoursService]
})
export class BusinessHoursModule{}