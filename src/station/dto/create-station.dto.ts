import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsNotEmpty()
  station_name: string;

  @IsString()
  address: string;
}
