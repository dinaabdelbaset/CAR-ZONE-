import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CarCondition, ServiceHistory } from '../enums/used-car.enums';

export class FilterUsedCarsDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'Honda', description: 'Filter by brand' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ example: 'Accord', description: 'Filter by model' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 'Sedan', description: 'Filter by body type' })
  @IsOptional()
  @IsString()
  bodyType?: string;

  @ApiPropertyOptional({
    example: 'Gasoline',
    description: 'Filter by fuel type',
  })
  @IsOptional()
  @IsString()
  fuelType?: string;

  @ApiPropertyOptional({
    example: 'Automatic',
    description: 'Filter by transmission',
  })
  @IsOptional()
  @IsString()
  transmission?: string;

  @ApiPropertyOptional({
    enum: CarCondition,
    example: CarCondition.EXCELLENT,
    description: 'Filter by condition',
  })
  @IsOptional()
  @IsEnum(CarCondition)
  condition?: CarCondition;

  @ApiPropertyOptional({
    enum: ServiceHistory,
    example: ServiceHistory.FULL,
    description: 'Filter by service history',
  })
  @IsOptional()
  @IsEnum(ServiceHistory)
  serviceHistory?: ServiceHistory;

  @ApiPropertyOptional({ example: 2018, description: 'Minimum year' })
  @IsOptional()
  @IsInt()
  @Min(1900)
  minYear?: number;

  @ApiPropertyOptional({ example: 2024, description: 'Maximum year' })
  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear() + 1)
  maxYear?: number;

  @ApiPropertyOptional({ example: 10000, description: 'Minimum price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 50000, description: 'Maximum price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ example: 0, description: 'Minimum mileage' })
  @IsOptional()
  @IsInt()
  @Min(0)
  minMileage?: number;

  @ApiPropertyOptional({ example: 100000, description: 'Maximum mileage' })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxMileage?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Maximum number of previous owners',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxPreviousOwners?: number;

  @ApiPropertyOptional({
    example: 'accord',
    description: 'Search in brand, model, description',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
