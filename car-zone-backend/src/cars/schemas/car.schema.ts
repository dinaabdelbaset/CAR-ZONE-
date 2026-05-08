import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Brand } from '../../brands/schemas/brand.schema';
import { BodyType } from '../../body-types/schemas/body-type.schema';
import { FuelType } from '../../fuel-types/schemas/fuel-type.schema';
import { Transmission } from '../../transmissions/schemas/transmission.schema';

export type CarDocument = HydratedDocument<Car>;

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
export class Car {
  id?: string;
  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Brand | Types.ObjectId;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'BodyType', required: true })
  bodyType: BodyType | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'FuelType', required: true })
  fuelType: FuelType | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Transmission', required: true })
  transmission: Transmission | Types.ObjectId;

  @Prop({ required: true })
  mileage: string;

  @Prop({ required: true })
  engine: string;

  @Prop({ required: true })
  seating: number;

  @Prop({ required: true })
  image: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  isFeatured?: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);
