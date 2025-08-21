import { Module } from '@nestjs/common';
import { InforTypeService } from './infor_type.service';
import { InforTypeController } from './infor_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InforType, InforTypeSchema } from './schemas/infor_type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: InforType.name, schema: InforTypeSchema }])],
  controllers: [InforTypeController],
  providers: [InforTypeService],
})
export class InforTypeModule {}
