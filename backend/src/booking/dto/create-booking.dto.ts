import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
    IsEmail
} from "class-validator";

export class CreateBookingDto {

    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    serviceId: string;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsOptional()
    comment?: string;
}
