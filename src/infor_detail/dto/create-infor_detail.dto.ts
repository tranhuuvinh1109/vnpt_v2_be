import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateInforDetailDto {
  @IsNotEmpty()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  type: string; // ObjectId của infor_type
}
