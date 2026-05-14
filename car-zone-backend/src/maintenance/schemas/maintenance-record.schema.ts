import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MaintenanceRecordDocument = MaintenanceRecord & Document;

@Schema({ timestamps: true })
export class MaintenanceRecord {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserCar', required: true })
  userCarId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MaintenanceRequest' })
  requestId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  engineerId: MongooseSchema.Types.ObjectId; // المهندس اللي عمل الصيانة

  @Prop({ required: true })
  actionTaken: string; // تفاصيل الصيانة

  @Prop([String])
  partsReplaced: string[];

  @Prop()
  cost: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const MaintenanceRecordSchema = SchemaFactory.createForClass(MaintenanceRecord);
