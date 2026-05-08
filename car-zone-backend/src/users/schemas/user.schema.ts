import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password?: string; // In a real app, this would be hashed

  @Prop({ default: 'User', enum: ['User', 'Admin'] })
  role: string;

  @Prop({ default: 'Active', enum: ['Active', 'Suspended'] })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
