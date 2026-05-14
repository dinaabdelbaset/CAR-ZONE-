import { IsString, IsOptional, IsArray, IsNumber, IsMongoId } from 'class-validator';

export class CreateMaintenanceRecordDto {
  @IsMongoId()
  userCarId: string;

  @IsMongoId()
  @IsOptional()
  requestId?: string;

  @IsString()
  actionTaken: string;

  @IsArray()
  @IsOptional()
  partsReplaced?: string[];

  @IsNumber()
  @IsOptional()
  cost?: number;
}
