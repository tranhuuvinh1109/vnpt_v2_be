import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InforDetail, InforDetailDocument } from './schemas/infor_detail.schema';
import { CreateInforDetailDto } from './dto/create-infor_detail.dto';
import { UpdateInforDetailDto } from './dto/update-infor_detail.dto';

@Injectable()
export class InforDetailService {
  constructor(
    @InjectModel(InforDetail.name) private inforDetailModel: Model<InforDetailDocument>,
  ) {}

  async create(createDto: CreateInforDetailDto): Promise<InforDetail> {
    const created = new this.inforDetailModel(createDto);
    return created.save();
  }

  async findAll(): Promise<InforDetail[]> {
    return this.inforDetailModel.find().populate('type').exec();
  }

  async findOne(id: string): Promise<InforDetail> {
    const infor = await this.inforDetailModel.findById(id).populate('type').exec();
    if (!infor) throw new NotFoundException(`InforDetail #${id} not found`);
    return infor;
  }

  async update(id: string, updateDto: UpdateInforDetailDto): Promise<InforDetail> {
    const updated = await this.inforDetailModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`InforDetail #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<InforDetail> {
    const deleted = await this.inforDetailModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`InforDetail #${id} not found`);
    return deleted;
  }
}
