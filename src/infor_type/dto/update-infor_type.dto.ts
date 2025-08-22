import { PartialType } from '@nestjs/swagger';
import { CreateInforTypeDto } from './create-infor_type.dto';

export class UpdateInforTypeDto extends PartialType(CreateInforTypeDto) {}
