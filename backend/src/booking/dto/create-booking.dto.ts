import {
  IsString,
  IsOptional,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  ValidateIf
} from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  serviceId: string;

  @IsDateString()
  date: string;

  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
