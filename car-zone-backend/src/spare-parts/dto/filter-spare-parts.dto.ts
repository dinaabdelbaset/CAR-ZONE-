import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common';
import { PartCondition, PartCategory } from '../enums/spare-part.enums';

export class FilterSparePartsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter by category',
    enum: PartCategory,
  })
  @IsOptional()
  @IsEnum(PartCategory)
  category?: PartCategory;

  @ApiPropertyOptional({ description: 'Filter by brand' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Filter by condition',
    enum: PartCondition,
  })
  @IsOptional()
  @IsEnum(PartCondition)
  condition?: PartCondition;

  @ApiPropertyOptional({ description: 'Filter by stock availability' })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ description: 'Search in name and description' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Minimum price', example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price', example: 500 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by compatible car model' })
  @IsOptional()
  @IsString()
  compatibility?: string;
}
