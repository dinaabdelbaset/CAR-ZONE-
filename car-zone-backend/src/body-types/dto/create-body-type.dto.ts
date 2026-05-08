import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBodyTypeDto {
  @ApiProperty({ description: 'Body type name', example: 'SUV' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Body type description',
    example: 'Sport Utility Vehicle',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
