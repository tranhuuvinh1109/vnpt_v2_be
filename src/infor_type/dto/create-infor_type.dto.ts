import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInforTypeDto {
  @IsString()
  @IsNotEmpty()
  type_name: string;
}
