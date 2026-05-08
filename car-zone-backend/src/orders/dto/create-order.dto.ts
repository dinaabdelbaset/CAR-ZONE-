import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsEmail, IsNotEmpty } from 'class-validator';
import { ItemType } from '../schemas/order.schema';

export class CreateOrderDto {
  @ApiProperty({ example: 'Ahmed Ali' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ example: 'ahmed@example.com' })
  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @ApiProperty({ example: '01000000000' })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiProperty({ enum: ItemType })
  @IsEnum(ItemType)
  itemType: ItemType;

  @ApiProperty({ example: '650000000000000000000000' })
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty({ example: 'Toyota Camry' })
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  amount: number;
}
