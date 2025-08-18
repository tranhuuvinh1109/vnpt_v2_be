import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ type: Number, required: true, unique: true })
  id: number; // pk

  @Prop({ type: Types.ObjectId, ref: 'UserType' })
  user_type_id: Types.ObjectId; // > user_types.id

  @Prop()
  parse_id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone_number: string;

  @Prop({ type: Date })
  date_of_birth: Date;

  @Prop({ type: Number })
  role: number;

  @Prop()
  user_address: string;

  @Prop({ type: Types.ObjectId, ref: 'Station' })
  station: Types.ObjectId; // > station.id
}

export const UserSchema = SchemaFactory.createForClass(User);
