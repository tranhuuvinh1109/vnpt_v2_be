import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationDocument = Station & Document;

@Schema({ timestamps: true })
export class Station {
  @Prop({ required: true })
  station_name: string;

  @Prop()
  address: string;
}

export const StationSchema = SchemaFactory.createForClass(Station);
