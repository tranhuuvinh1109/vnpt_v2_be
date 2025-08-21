import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InforDetailService } from './infor_detail.service';
import { CreateInforDetailDto } from './dto/create-infor_detail.dto';
import { UpdateInforDetailDto } from './dto/update-infor_detail.dto';

@Controller('infor-detail')
export class InforDetailController {
  constructor(private readonly inforDetailService: InforDetailService) {}

  @Post()
  create(@Body() createInforDetailDto: CreateInforDetailDto) {
    return this.inforDetailService.create(createInforDetailDto);
  }

  @Get()
  findAll() {
    return this.inforDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inforDetailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInforDetailDto: UpdateInforDetailDto) {
    return this.inforDetailService.update(id, updateInforDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inforDetailService.remove(id);
  }
}
