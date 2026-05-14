import { IsString, IsEnum, IsOptional, IsDateString, IsMongoId } from 'class-validator';
import { MaintenanceType } from '../schemas/maintenance-request.schema';

export class CreateMaintenanceRequestDto {
  @IsMongoId()
  userCarId: string;

  @IsEnum(MaintenanceType)
  type: MaintenanceType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
