import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateFollowDayDto } from './dto/create-shift-day-dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'infor_pre_image', maxCount: 1 },
      { name: 'infor_during_image', maxCount: 1 },
      { name: 'infor_exist_image', maxCount: 1 },
    ]),
  )
  async updateShiftFollowDay(
    @Param('id') shiftId: string,
    @UploadedFiles()
    files: {
      infor_pre_image?: Express.Multer.File[];
      infor_during_image?: Express.Multer.File[];
      infor_exist_image?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    const toBase64 = (file?: Express.Multer.File) => {
      if (!file) return undefined;
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      return base64;
    };

    return this.shiftService.updateShiftFollowDay(shiftId, {
      ...body,
      infor_pre: {
        _id: body.infor_pre_id,
        note: body.infor_pre_note,
        image: files.infor_pre_image ? toBase64(files.infor_pre_image[0]) : undefined,
      },
      infor_during: {
        _id: body.infor_during_id,
        note: body.infor_during_note,
        image: files.infor_during_image ? toBase64(files.infor_during_image[0]) : undefined,
      },
      infor_exist: {
        _id: body.infor_exist_id,
        note: body.infor_exist_note,
        image: files.infor_exist_image ? toBase64(files.infor_exist_image[0]) : undefined,
      },
    });
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
