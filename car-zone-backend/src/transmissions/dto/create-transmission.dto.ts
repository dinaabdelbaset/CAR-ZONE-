import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransmissionDto {
  @ApiProperty({ description: 'Transmission type name', example: 'Automatic' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Transmission description',
    example: 'Automatic gear shifting',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
