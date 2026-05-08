import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PartCondition, PartCategory } from '../enums/spare-part.enums';

export type SparePartDocument = HydratedDocument<SparePart>;

@Schema({ timestamps: true, toJSON: { virtuals: true, getters: true } })
export class SparePart {
  id?: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: PartCategory })
  category: PartCategory;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  compatibility: string[];

  @Prop({ default: true })
  inStock: boolean;

  @Prop({ required: true, unique: true })
  partNumber: string;

  @Prop({ required: true })
  warranty: string;

  @Prop({ required: true, enum: PartCondition, default: PartCondition.NEW })
  condition: PartCondition;
}

export const SparePartSchema = SchemaFactory.createForClass(SparePart);
