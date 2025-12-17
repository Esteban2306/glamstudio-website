import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { AvailabilityController } from "./availability.controller";
import { AvailabilityService } from "./availability.service";

@Module({
    imports: [PrismaModule],
    controllers: [AvailabilityController],
    providers: [AvailabilityService],
    exports: [AvailabilityService],
})
export class AvailabilityModule {}