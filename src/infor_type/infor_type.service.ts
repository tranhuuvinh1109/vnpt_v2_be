import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InforType, InforTypeDocument } from './schemas/infor_type.schema';
import { CreateInforTypeDto } from './dto/create-infor_type.dto';
import { UpdateInforTypeDto } from './dto/update-infor_type.dto';

@Injectable()
export class InforTypeService {
  constructor(@InjectModel(InforType.name) private inforTypeModel: Model<InforTypeDocument>) {}

  async create(dto: CreateInforTypeDto): Promise<InforType> {
    const created = new this.inforTypeModel(dto);
    return created.save();
  }

  async findAll(): Promise<InforType[]> {
    return this.inforTypeModel.find().exec();
  }

  async findOne(id: string): Promise<InforType> {
    const found = await this.inforTypeModel.findById(id).exec();
    if (!found) throw new NotFoundException(`InforType with ID ${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateInforTypeDto): Promise<InforType> {
    const updated = await this.inforTypeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`InforType with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.inforTypeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`InforType with ID ${id} not found`);
  }
}
