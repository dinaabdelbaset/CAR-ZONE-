import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsUrl,
  IsOptional,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { CarCondition, ServiceHistory } from '../enums/used-car.enums';

export class CreateUsedCarDto {
  @ApiProperty({ example: 'Honda', description: 'Car brand' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Accord', description: 'Car model' })
  @IsString()
  model: string;

  @ApiProperty({ example: 2021, description: 'Manufacturing year' })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @ApiProperty({ example: 24500, description: 'Price in dollars' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 32000, description: 'Mileage in miles' })
  @IsInt()
  @Min(0)
  mileage: number;

  @ApiProperty({ example: 'Sedan', description: 'Body type' })
  @IsString()
  bodyType: string;

  @ApiProperty({ example: 'Gasoline', description: 'Fuel type' })
  @IsString()
  fuelType: string;

  @ApiProperty({ example: 'Automatic', description: 'Transmission type' })
  @IsString()
  transmission: string;

  @ApiProperty({ example: '29/35 MPG', description: 'Fuel economy' })
  @IsString()
  mpg: string;

  @ApiProperty({
    example: '1.5L Turbo I4',
    description: 'Engine specifications',
  })
  @IsString()
  engine: string;

  @ApiProperty({ example: 5, description: 'Number of seats' })
  @IsInt()
  @Min(1)
  @Max(15)
  seating: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Main image URL',
  })
  @IsUrl()
  image: string;

  @ApiPropertyOptional({
    example: ['https://example.com/image1.jpg'],
    description: 'Additional image URLs',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({
    enum: CarCondition,
    example: CarCondition.EXCELLENT,
    description: 'Vehicle condition',
  })
  @IsEnum(CarCondition)
  condition: CarCondition;

  @ApiPropertyOptional({
    example: ['Backup Camera', 'Bluetooth'],
    description: 'List of features',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({
    example: 'Well-maintained vehicle with low mileage.',
    description: 'Vehicle description',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, description: 'Number of previous owners' })
  @IsInt()
  @Min(0)
  previousOwners: number;

  @ApiProperty({
    enum: ServiceHistory,
    example: ServiceHistory.FULL,
    description: 'Service history status',
  })
  @IsEnum(ServiceHistory)
  serviceHistory: ServiceHistory;
}
