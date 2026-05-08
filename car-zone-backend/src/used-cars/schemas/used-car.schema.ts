import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CarCondition, ServiceHistory } from '../enums/used-car.enums';

export type UsedCarDocument = UsedCar & Document;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    // transform: (doc, ret: Record<string, unknown>) => {
    //   // ret.id = ret._id;

    //   delete ret.__v;
    //   return { ...ret };
    // },
  },
})
export class UsedCar {
  id?: string;

  @ApiProperty({ example: 'Honda' })
  @Prop({ required: true })
  brand: string;

  @ApiProperty({ example: 'Accord' })
  @Prop({ required: true })
  model: string;

  @ApiProperty({ example: 2021 })
  @Prop({ required: true })
  year: number;

  @ApiProperty({ example: 24500 })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ example: 32000 })
  @Prop({ required: true })
  mileage: number;

  @ApiProperty({ example: 'Sedan' })
  @Prop({ required: true })
  bodyType: string;

  @ApiProperty({ example: 'Gasoline' })
  @Prop({ required: true })
  fuelType: string;

  @ApiProperty({ example: 'Automatic' })
  @Prop({ required: true })
  transmission: string;

  @ApiProperty({ example: '29/35 MPG' })
  @Prop({ required: true })
  mpg: string;

  @ApiProperty({ example: '1.5L Turbo I4' })
  @Prop({ required: true })
  engine: string;

  @ApiProperty({ example: 5 })
  @Prop({ required: true })
  seating: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @Prop({ required: true })
  image: string;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    type: [String],
  })
  @Prop({ type: [String], default: [] })
  images: string[];

  @ApiProperty({ enum: CarCondition, example: CarCondition.EXCELLENT })
  @Prop({ required: true, enum: CarCondition })
  condition: CarCondition;

  @ApiProperty({
    example: ['Backup Camera', 'Bluetooth', 'Cruise Control'],
    type: [String],
  })
  @Prop({ type: [String], default: [] })
  features: string[];

  @ApiProperty({ example: 'Well-maintained vehicle with low mileage.' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 1 })
  @Prop({ required: true, min: 0 })
  previousOwners: number;

  @ApiProperty({ enum: ServiceHistory, example: ServiceHistory.FULL })
  @Prop({ required: true, enum: ServiceHistory })
  serviceHistory: ServiceHistory;
}

export const UsedCarSchema = SchemaFactory.createForClass(UsedCar);

// Indexes for common queries
UsedCarSchema.index({ brand: 1 });
UsedCarSchema.index({ price: 1 });
UsedCarSchema.index({ year: -1 });
UsedCarSchema.index({ mileage: 1 });
UsedCarSchema.index({ condition: 1 });
UsedCarSchema.index({ bodyType: 1 });
UsedCarSchema.index({ fuelType: 1 });
