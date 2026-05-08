import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'Brand ID', example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'Car model name', example: '911 Carrera' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'Manufacturing year', example: 2024 })
  @IsNumber()
  @Min(1900)
  year: number;

  @ApiProperty({ description: 'Price in USD', example: 115000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Body type ID',
    example: '507f1f77bcf86cd799439012',
  })
  @IsMongoId()
  @IsNotEmpty()
  bodyType: string;

  @ApiProperty({
    description: 'Fuel type ID',
    example: '507f1f77bcf86cd799439013',
  })
  @IsMongoId()
  @IsNotEmpty()
  fuelType: string;

  @ApiProperty({
    description: 'Transmission ID',
    example: '507f1f77bcf86cd799439014',
  })
  @IsMongoId()
  @IsNotEmpty()
  transmission: string;

  @ApiProperty({ description: 'Mileage info', example: '18/24 MPG' })
  @IsString()
  @IsNotEmpty()
  mileage: string;

  @ApiProperty({
    description: 'Engine specification',
    example: '3.0L Twin-Turbo H6',
  })
  @IsString()
  @IsNotEmpty()
  engine: string;

  @ApiProperty({ description: 'Number of seats', example: 4 })
  @IsNumber()
  @Min(1)
  seating: number;

  @ApiProperty({
    description: 'Main image URL',
    example: 'https://example.com/car.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiPropertyOptional({ description: 'Additional images', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ description: 'Car features list', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @ApiProperty({
    description: 'Car description',
    example: 'A powerful sports car...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
