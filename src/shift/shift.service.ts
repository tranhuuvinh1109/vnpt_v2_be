import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shift } from './schemas/shift.schema';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftService {
  constructor(@InjectModel(Shift.name) private shiftModel: Model<Shift>) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const shift = new this.shiftModel(createShiftDto);
    return shift.save();
  }

  async findAll(): Promise<Shift[]> {
    return this.shiftModel.find().exec();
  }

  async findOne(id: string): Promise<Shift> {
    const shift = await this.shiftModel.findById(id).exec();
    if (!shift) throw new NotFoundException(`Shift with ID ${id} not found`);
    return shift;
  }

  async update(id: string, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.shiftModel.findByIdAndUpdate(id, updateShiftDto, { new: true }).exec();
    if (!shift) throw new NotFoundException(`Shift with ID ${id} not found`);
    return shift;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.shiftModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Shift with ID ${id} not found`);
    return { message: 'Shift deleted successfully' };
  }
}
