import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransmissionDocument = HydratedDocument<Transmission>;

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
export class Transmission {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;
}

export const TransmissionSchema = SchemaFactory.createForClass(Transmission);
