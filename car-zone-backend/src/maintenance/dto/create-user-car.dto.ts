import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateUserCarDto {
  @IsString()
  carModel: string;

  @IsString()
  vin: string;

  @IsDateString()
  @IsOptional()
  purchaseDate?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  plateNumber?: string;
}
