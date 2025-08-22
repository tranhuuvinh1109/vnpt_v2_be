import { IsEmail, IsNotEmpty, IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
