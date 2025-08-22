import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type InforDetailDocument = InforDetail & Document;

@Schema({ timestamps: true })
export class InforDetail {
  @Prop({ type: String, default: '' })
  note: string;

  @Prop({ type: String, default: '' })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'InforType', required: true })
  type: Types.ObjectId;
}

export const InforDetailSchema = SchemaFactory.createForClass(InforDetail);
