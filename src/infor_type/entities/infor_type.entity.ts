import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'infor_types', timestamps: true })
export class InforType extends Document {
  @Prop({ required: true, unique: true })
  type_name: string;

  @Prop()
  description?: string;
}

export const InforTypeSchema = SchemaFactory.createForClass(InforType);
