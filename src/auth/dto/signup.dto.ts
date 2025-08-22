import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsDate()
  date_of_birth?: Date;

  @IsOptional()
  @IsNumber()
  role?: number;

  @IsOptional()
  @IsString()
  user_address?: string;

  @IsOptional()
  @IsString()
  parse_id?: string;

  @IsOptional()
  user_type_id?: string;

  @IsOptional()
  station?: string;
}
