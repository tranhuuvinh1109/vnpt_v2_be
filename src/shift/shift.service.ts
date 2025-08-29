import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shift, ShiftDocument } from './schemas/shift.schema';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InforDetailService } from 'src/infor_detail/infor_detail.service';
import { InforTypeEnum, ShiftStatusEnum } from '../enum/common';
import { CreateFollowDayDto } from './dto/create-shift-day-dto';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift.name) private shiftModel: Model<Shift>,
    private readonly infoDetailService: InforDetailService,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<ShiftDocument> {
    const shift = new this.shiftModel(createShiftDto);
    return shift.save();
  }

  async createFollowDay({ start_time, create_user, end_time, date }: CreateFollowDayDto) {
    if (!start_time || !end_time) {
      throw new BadRequestException('Date is required');
    }

    const createdShifts: ShiftDocument[] = [];

    for (let i = 0; i < 3; i++) {
      const infoExist = await this.infoDetailService.create({
        note: '',
        type: InforTypeEnum.EXIST,
        image: '',
      });
      const infoDuring = await this.infoDetailService.create({
        note: '',
        type: InforTypeEnum.DURING,
        image: '',
      });
      const infoPre = await this.infoDetailService.create({
        note: '',
        type: InforTypeEnum.PREVIOUS,
        image: '',
      });

      const shift = await this.shiftModel.create({
        date,
        assign_user: null,
        pre_shift: null,
        next_shift: null, // sẽ cập nhật sau khi tạo xong tất cả
        start_time: start_time,
        end_time: end_time,
        shift_number: i + 1, // shift_number từ 1 -> 3
        infor_exist: infoExist._id,
        infor_during: infoDuring._id,
        infor_pre: infoPre._id,
        status: ShiftStatusEnum.WAITING,
        approved: false,
        note: '',
        create_user: create_user,
        station: '68a881eeaa9ddb69afa27cea', // default station
      });

      createdShifts.push(shift);
    }

    return {
      message: 'Shifts for the day created successfully',
      data: createdShifts,
    };
  }

  async findAll() {
    return this.shiftModel
      .find()
      .populate('infor_exist')
      .populate('infor_during')
      .populate('infor_pre')
      .populate('station')
      .populate('create_user')
      .populate('assign_user')
      .exec();
  }

  async findAllOrder() {
    const shifts = await this.shiftModel
      .find()
      .select('-__v -createdAt -updatedAt')
      .populate('infor_exist', '-__v -createdAt -updatedAt')
      .populate('infor_during', '-__v -createdAt -updatedAt')
      .populate('infor_pre', '-__v -createdAt -updatedAt')
      .populate('station', '-__v -createdAt -updatedAt')
      .populate('create_user', '-__v -createdAt -updatedAt')
      .populate('assign_user', '-__v -createdAt -updatedAt')
      .sort({ date: 1 })
      .exec();

    const grouped = shifts.reduce((acc, shift) => {
      const dateKey = new Date(shift.date).toISOString().split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          shifts: [],
        };
      }

      acc[dateKey].shifts.push(shift);
      return acc;
    }, {});

    return Object.values(grouped);
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
