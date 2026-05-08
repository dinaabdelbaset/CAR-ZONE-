import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum ItemType {
  CAR = 'Car',
  USED_CAR = 'Used Car',
  SPARE_PART = 'Spare Part',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ type: String, enum: Object.values(ItemType), required: true })
  itemType: ItemType;

  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
