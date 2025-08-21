import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InforTypeService } from './infor_type.service';
import { CreateInforTypeDto } from './dto/create-infor_type.dto';
import { UpdateInforTypeDto } from './dto/update-infor_type.dto';

@Controller('infor-type')
export class InforTypeController {
  constructor(private readonly inforTypeService: InforTypeService) {}

  @Post()
  create(@Body() createInforTypeDto: CreateInforTypeDto) {
    return this.inforTypeService.create(createInforTypeDto);
  }

  @Get()
  findAll() {
    return this.inforTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inforTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInforTypeDto: UpdateInforTypeDto) {
    return this.inforTypeService.update(id, updateInforTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inforTypeService.remove(id);
  }
}
