import { Module } from '@nestjs/common';
import { InforDetailService } from './infor_detail.service';
import { InforDetailController } from './infor_detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InforDetail, InforDetailSchema } from './schemas/infor_detail.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: InforDetail.name, schema: InforDetailSchema }])],
  controllers: [InforDetailController],
  providers: [InforDetailService],
})
export class InforDetailModule {}
