import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class updateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}