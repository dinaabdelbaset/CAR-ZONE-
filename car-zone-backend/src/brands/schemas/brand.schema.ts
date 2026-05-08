import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (doc, ret: Record<string, unknown>) => {
      delete ret.__v;
      delete ret._id;
      return { ...ret };
    },
  },
})
export class Brand {
  id?: string;
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  logo?: string;

  @Prop()
  country?: string;

  @Prop({ type: String, required: false })
  description?: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
