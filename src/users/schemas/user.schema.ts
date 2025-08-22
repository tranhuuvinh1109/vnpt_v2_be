import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ type: Types.ObjectId, ref: 'UserType' })
  user_type_id: Types.ObjectId;

  @Prop()
  parse_id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone_number: string;

  @Prop({ type: Date })
  date_of_birth: Date;

  @Prop({ type: Number })
  role: number;

  @Prop()
  user_address: string;

  @Prop({ type: Types.ObjectId, ref: 'Station' })
  station: Types.ObjectId;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ select: false })
  access_token: string;

  @Prop({ select: false })
  refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
