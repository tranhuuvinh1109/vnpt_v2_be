import { IsNotEmpty, IsEnum } from 'class-validator';
import { InforTypeEnum } from '../../enum/common';

export class CreateInforTypeDto {
  @IsNotEmpty()
  @IsEnum(InforTypeEnum, {
    message: 'type_name must be one of: previous, current, next',
  })
  type_name: InforTypeEnum;
}
