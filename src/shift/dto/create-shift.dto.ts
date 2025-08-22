import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class CreateShiftDto {
  @IsMongoId()
  @IsNotEmpty()
  assign_user: string; // ObjectId của user

  @IsMongoId()
  @IsOptional()
  pre_shift?: string; // ObjectId của ca trước

  @IsMongoId()
  @IsOptional()
  next_shift?: string; // ObjectId của ca sau

  @IsDateString()
  @IsNotEmpty()
  date: string; // ISO Date string

  @IsDateString()
  @IsNotEmpty()
  start_time: string; // ISO Date string

  @IsDateString()
  @IsNotEmpty()
  end_time: string; // ISO Date string

  @IsOptional()
  shift_number?: number; // số ca, có thể optional

  @IsMongoId()
  @IsOptional()
  infor_exist?: string; // ObjectId infor_detail

  @IsMongoId()
  @IsOptional()
  infor_during?: string;

  @IsMongoId()
  @IsOptional()
  infor_pre?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  approved?: boolean;

  @IsString()
  @IsOptional()
  note?: string;

  @IsMongoId()
  @IsNotEmpty()
  create_user: string; // ObjectId người tạo

  @IsMongoId()
  @IsNotEmpty()
  station: string; // ObjectId của station
}
