import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateFollowDayDto {
  @IsNotEmpty({ message: 'Start time is required' })
  @IsDateString({}, { message: 'Start time must be a valid ISO date string' })
  start_time: string;

  @IsNotEmpty({ message: 'End time is required' })
  @IsDateString({}, { message: 'End time must be a valid ISO date string' })
  end_time: string;

  @IsNotEmpty({ message: 'Create user is required' })
  @IsString({ message: 'Create user must be a string' })
  create_user: string;

  @IsNotEmpty({ message: 'Date is required' })
  @IsString({ message: 'Date must be a string' })
  date: string;
}
