import { Test, TestingModule } from '@nestjs/testing';
import { InforDetailService } from './infor_detail.service';

describe('InforDetailService', () => {
  let service: InforDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InforDetailService],
    }).compile();

    service = module.get<InforDetailService>(InforDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
