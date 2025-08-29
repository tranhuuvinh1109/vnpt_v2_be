import { Module } from '@nestjs/common';
import { InforDetailService } from './infor_detail.service';
import { InforDetailController } from './infor_detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InforDetail, InforDetailSchema } from './schemas/infor_detail.schema';
import { InforTypeModule } from '../infor_type/infor_type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InforDetail.name, schema: InforDetailSchema }]),
    InforTypeModule,
  ],
  controllers: [InforDetailController],
  providers: [InforDetailService],
  exports: [InforDetailService],
})
export class InforDetailModule {}
