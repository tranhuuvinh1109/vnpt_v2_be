import { Test, TestingModule } from '@nestjs/testing';
import { InforDetailController } from './infor_detail.controller';
import { InforDetailService } from './infor_detail.service';

describe('InforDetailController', () => {
  let controller: InforDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InforDetailController],
      providers: [InforDetailService],
    }).compile();

    controller = module.get<InforDetailController>(InforDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
