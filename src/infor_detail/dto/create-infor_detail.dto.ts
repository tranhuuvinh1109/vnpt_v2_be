import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { InforTypeEnum } from 'src/enum/common';

export class CreateInforDetailDto {
  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(InforTypeEnum))
  type: InforTypeEnum;
}
