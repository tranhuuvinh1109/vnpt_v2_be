import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InforTypeDocument = InforType & Document;

@Schema({ timestamps: true })
export class InforType {
  @Prop({ required: true, unique: true })
  type_name: string;
}

export const InforTypeSchema = SchemaFactory.createForClass(InforType);
