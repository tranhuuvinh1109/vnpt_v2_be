import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto, UpdateShiftFollowDayDto } from './dto/update-shift.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
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

  @ApiBody({
    description: 'Update shift',
    schema: {
      example: {
        _id: '68b2f5fea06561c03268be36',
        station: '68a881eeaa9ddb69afa27cea',
        assign: ['68a4a20ede1c4f597caeac5a', '68adda278715a60428cbe1cd'],
        infor_pre: {
          _id: '68b2f5fea06561c03268be34',
          note: 'Note test',
          image: 'image',
        },
        infor_during: {
          _id: '68b2f5fea06561c03268be31',
          note: 'Note test222',
          image: 'image222',
        },
        infor_exist: {
          _id: '68b2f5fea06561c03268be2e',
          note: 'Note 333',
          image: 'image222333',
        },
      },
    },
  })
  @Patch('update-follow-day/:id')
  updateFollowDay(
    @Param('id') id: string,
    @Body() updateShiftFollowDayDto: UpdateShiftFollowDayDto,
  ) {
    return this.shiftService.updateShiftFollowDay(id, updateShiftFollowDayDto);
  }

  @Get('order')
  @ApiQuery({ name: 'from', required: false, example: '2025-08-19T00:00:00.000+00:00' })
  @ApiQuery({ name: 'to', required: false, example: '2025-08-19T00:00:00.000+00:00' })
  findAllOrder(@Query('from') from?: string, @Query('to') to?: string) {
    return this.shiftService.findAllOrder({ from, to });
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
