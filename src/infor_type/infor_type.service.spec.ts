import { Test, TestingModule } from '@nestjs/testing';
import { InforTypeService } from './infor_type.service';

describe('InforTypeService', () => {
  let service: InforTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InforTypeService],
    }).compile();

    service = module.get<InforTypeService>(InforTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
