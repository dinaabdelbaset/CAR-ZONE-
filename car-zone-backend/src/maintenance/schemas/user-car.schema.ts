import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserCarDocument = UserCar & Document;

@Schema({ timestamps: true })
export class UserCar {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  carModel: string;

  @Prop({ required: true, unique: true })
  vin: string; // Vehicle Identification Number - الهوية الرقمية للسيارة

  @Prop()
  purchaseDate: Date;

  @Prop()
  color: string;

  @Prop()
  plateNumber: string;
}

export const UserCarSchema = SchemaFactory.createForClass(UserCar);
