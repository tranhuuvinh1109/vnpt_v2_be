import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ApiBody } from '@nestjs/swagger';
import { CreateFollowDayDto } from './dto/create-shift-day-dto';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @ApiBody({
    description: 'Create a new shift',
    schema: {
      example: {
        start_time: '2025-08-19T08:00:00.000Z',
        end_time: '2025-08-19T16:00:00.000Z',
        create_user: '68a34e5b082a75a4003903d7',
        date: '2025-08-19T00:00:00.000Z',
      },
    },
  })
  @Post('create-follow-day')
  createFollowDay(@Body() createFollowDayDto: CreateFollowDayDto) {
    return this.shiftService.createFollowDay(createFollowDayDto);
  }

  @Get('order')
  findAllOrder() {
    return this.shiftService.findAllOrder();
  }

  @Get()
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftService.remove(id);
  }
}
