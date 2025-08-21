import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsString()
  description?: string;
}
