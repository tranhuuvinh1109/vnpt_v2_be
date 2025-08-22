import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShiftDocument = Shift & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Shift {
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  assign_user: Types.ObjectId; // > users.id

  @Prop({ type: Types.ObjectId, ref: 'Shift', default: null })
  pre_shift: Types.ObjectId; // > shift.id

  @Prop({ type: Types.ObjectId, ref: 'Shift', default: null })
  next_shift: Types.ObjectId; // > shift.id

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Date })
  start_time: Date;

  @Prop({ type: Date })
  end_time: Date;

  @Prop({ type: Number })
  shift_number: number;

  @Prop({ type: Types.ObjectId, ref: 'InforDetail', default: null })
  infor_exist: Types.ObjectId; // > infor_detail.id

  @Prop({ type: Types.ObjectId, ref: 'InforDetail', default: null })
  infor_during: Types.ObjectId; // > infor_detail.id

  @Prop({ type: Types.ObjectId, ref: 'InforDetail', default: null })
  infor_pre: Types.ObjectId; // > infor_detail.id

  @Prop({ type: String })
  status: string;

  @Prop({ type: Boolean, default: false })
  approved: boolean;

  @Prop()
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  create_user: Types.ObjectId; // > users.id

  @Prop({ type: Types.ObjectId, ref: 'Station' })
  station: Types.ObjectId; // > station.id
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
