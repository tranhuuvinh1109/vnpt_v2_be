import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shift, ShiftSchema } from './schemas/shift.schema';
import { InforDetailModule } from 'src/infor_detail/infor_detail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shift.name, schema: ShiftSchema }]),
    InforDetailModule,
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
