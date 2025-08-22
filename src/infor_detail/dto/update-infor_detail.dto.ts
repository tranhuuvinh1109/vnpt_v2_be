import { PartialType } from '@nestjs/swagger';
import { CreateInforDetailDto } from './create-infor_detail.dto';

export class UpdateInforDetailDto extends PartialType(CreateInforDetailDto) {}
