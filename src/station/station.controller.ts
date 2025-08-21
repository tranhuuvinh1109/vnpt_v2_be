import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('station')
@ApiBearerAuth('access-token')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Station A' },
        address: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
      },
    },
  })
  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationService.create(createStationDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.stationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
    return this.stationService.update(id, updateStationDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(id);
  }
}
