import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFuelTypeDto {
  @ApiProperty({ description: 'Fuel type name', example: 'Electric' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Fuel type description',
    example: 'Battery-powered electric vehicle',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
