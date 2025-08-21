import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station, StationDocument } from './schemas/station.schema';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Injectable()
export class StationService {
  constructor(@InjectModel(Station.name) private stationModel: Model<StationDocument>) {}

  async create(dto: CreateStationDto): Promise<Station> {
    const created = new this.stationModel(dto);
    return created.save();
  }

  @Public()
  async findAll(): Promise<Station[]> {
    return this.stationModel.find().exec();
  }

  async findOne(id: string): Promise<Station> {
    const found = await this.stationModel.findById(id).exec();
    if (!found) throw new NotFoundException(`Station with ID ${id} not found`);
    return found;
  }

  async update(id: string, dto: UpdateStationDto): Promise<Station> {
    const updated = await this.stationModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Station with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.stationModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Station with ID ${id} not found`);
  }
}
