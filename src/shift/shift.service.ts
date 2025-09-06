import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shift, ShiftDocument } from './schemas/shift.schema';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateInfoDto, UpdateShiftDto, UpdateShiftFollowDayDto } from './dto/update-shift.dto';
import { InforDetailService } from 'src/infor_detail/infor_detail.service';
import { InforTypeEnum, ShiftStatusEnum } from '../enum/common';
import { CreateFollowDayDto } from './dto/create-shift-day-dto';
import dayjs from 'dayjs';

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

  async createFollowDay({ start_time, create_user, end_time, date, station }: CreateFollowDayDto) {
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
        station: station ?? '68a881eeaa9ddb69afa27cea', // default station
      });

      createdShifts.push(shift);
    }

    return {
      message: 'Shifts for the day created successfully',
      data: createdShifts,
    };
  }

  async updateShiftFollowDay(shiftId: string, dto: UpdateShiftFollowDayDto) {
    const {
      _id,
      station,
      assign,
      infor_pre,
      infor_during,
      infor_exist,
      status,
      approved,
      start_time,
      end_time,
    } = dto;

    const shift = await this.shiftModel.findById(shiftId);
    if (!shift) {
      throw new NotFoundException(`Shift with id ${_id} not found`);
    }

    shift.assign_user = assign.map((id) => new Types.ObjectId(id));
    shift.approved = approved ?? shift.approved;
    shift.status = status ?? shift.status;
    shift.start_time = start_time;
    shift.end_time = end_time;
    shift.station = new Types.ObjectId(station);

    type InforFields = 'infor_pre' | 'infor_during' | 'infor_exist';

    const updateInfor = async (inforDto: UpdateInfoDto, field: InforFields) => {
      if (inforDto && inforDto._id) {
        await this.infoDetailService.update(inforDto._id, {
          note: inforDto.note,
          image: inforDto.image,
        });

        shift[field] = new Types.ObjectId(inforDto._id) as any;
      }
    };

    await updateInfor(infor_pre, 'infor_pre');
    await updateInfor(infor_during, 'infor_during');
    await updateInfor(infor_exist, 'infor_exist');

    await shift.save();

    return shift;
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

  async findAllOrder(query: { from?: string; to?: string }) {
    const { from, to } = query;

    const filter: any = {};
    if (from || to) {
      filter.date = {};
      if (from) {
        filter.date.$gte = dayjs(from, 'YYYY-MM-DD').startOf('day').toDate();
      }
      if (to) {
        filter.date.$lte = dayjs(to, 'YYYY-MM-DD').endOf('day').toDate();
      }
    }

    const shifts = await this.shiftModel
      .find(filter)
      .select('-__v -createdAt -updatedAt')
      .populate('infor_exist', '-__v -createdAt -updatedAt')
      .populate('infor_during', '-__v -createdAt -updatedAt')
      .populate('infor_pre', '-__v -createdAt -updatedAt')
      .populate('station', '-__v -createdAt -updatedAt')
      .populate('create_user', '-__v -createdAt -updatedAt')
      .populate('assign_user', '-__v -createdAt -updatedAt')
      .sort({ date: 1 })
      .exec();

    const grouped = shifts.reduce(
      (acc, shift) => {
        const dateKey = new Date(shift.date).toISOString().split('T')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            shifts: [],
          };
        }

        acc[dateKey].shifts.push(shift);
        return acc;
      },
      {} as Record<string, { date: string; shifts: any[] }>,
    );

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
