import { Test, TestingModule } from '@nestjs/testing';
import { InforTypeController } from './infor_type.controller';
import { InforTypeService } from './infor_type.service';

describe('InforTypeController', () => {
  let controller: InforTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InforTypeController],
      providers: [InforTypeService],
    }).compile();

    controller = module.get<InforTypeController>(InforTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
