import { PartialType } from '@nestjs/swagger';
import { CreateShiftDto } from './create-shift.dto';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateShiftDto extends PartialType(CreateShiftDto) {}

export class UpdateInfoDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateShiftFollowDayDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  station: string;

  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @IsString()
  end_time: string;

  @IsArray()
  @IsString({ each: true })
  assign: string[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @Type(() => UpdateInfoDto)
  infor_pre: UpdateInfoDto;

  @Type(() => UpdateInfoDto)
  infor_during: UpdateInfoDto;

  @Type(() => UpdateInfoDto)
  infor_exist: UpdateInfoDto;
}
