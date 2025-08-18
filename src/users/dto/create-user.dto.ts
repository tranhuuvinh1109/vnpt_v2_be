import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  parse_id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  phone_number?: string;

  @IsOptional()
  date_of_birth?: Date;

  @IsOptional()
  role?: number;

  @IsOptional()
  user_address?: string;

  @IsOptional()
  station?: string;

  @IsOptional()
  user_type_id?: string;
}
