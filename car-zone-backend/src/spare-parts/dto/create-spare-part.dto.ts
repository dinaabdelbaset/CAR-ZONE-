import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartCondition, PartCategory } from '../enums/spare-part.enums';

export class CreateSparePartDto {
  @ApiProperty({ description: 'Part name', example: 'Brake Pad Set' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Part category',
    enum: PartCategory,
    example: PartCategory.BRAKES,
  })
  @IsEnum(PartCategory)
  category: PartCategory;

  @ApiProperty({ description: 'Brand name', example: 'Brembo' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'Price in USD', example: 89.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/part.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Part description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'Compatible car models', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  compatibility?: string[];

  @ApiPropertyOptional({ description: 'Availability status', default: true })
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @ApiProperty({ description: 'Unique part number', example: 'BP-5000-CER' })
  @IsString()
  @IsNotEmpty()
  partNumber: string;

  @ApiProperty({ description: 'Warranty period', example: '2 years' })
  @IsString()
  @IsNotEmpty()
  warranty: string;

  @ApiPropertyOptional({
    description: 'Part condition',
    enum: PartCondition,
    default: PartCondition.NEW,
  })
  @IsEnum(PartCondition)
  @IsOptional()
  condition?: PartCondition;
}
