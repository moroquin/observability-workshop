import { Test, TestingModule } from '@nestjs/testing';
import { OperationapiController } from './operationapi.controller';

describe('OperationapiController', () => {
  let controller: OperationapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationapiController],
    }).compile();

    controller = module.get<OperationapiController>(OperationapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
