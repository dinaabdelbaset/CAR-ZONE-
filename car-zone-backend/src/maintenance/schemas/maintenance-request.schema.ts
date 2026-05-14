import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MaintenanceRequestDocument = MaintenanceRequest & Document;

export enum MaintenanceType {
  PERIODIC = 'Periodic', // صيانة دورية
  BREAKDOWN = 'Breakdown', // عطل
  TOW_TRUCK = 'Tow Truck', // طلب ونش
}

export enum MaintenanceStatus {
  PENDING = 'Pending',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Schema({ timestamps: true })
export class MaintenanceRequest {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserCar', required: true })
  userCarId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, enum: Object.values(MaintenanceType), required: true })
  type: MaintenanceType;

  @Prop()
  description: string;

  @Prop()
  location: string; // Important for Tow Truck

  @Prop({ type: String, enum: Object.values(MaintenanceStatus), default: MaintenanceStatus.PENDING })
  status: MaintenanceStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  assignedEngineerId: MongooseSchema.Types.ObjectId;

  @Prop()
  scheduledDate: Date;

  @Prop()
  estimatedDuration: string; // المدة المتوقعة للصيانة

  @Prop()
  targetTime: Date; // الوقت المتوقع للوصول

  @Prop({ default: 0 })
  cancellationFee: number; // رسوم الإلغاء
}

export const MaintenanceRequestSchema = SchemaFactory.createForClass(MaintenanceRequest);
