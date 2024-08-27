import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { CreateOperationDto } from '../common/dto/CreateOperationDto';
import { ParserService } from '../parser/parser.service';
import { WorkerService } from '../worker/worker.service';
import { Response } from 'express';
import { eOperationType, iOperationArray } from '../common/interface/operation';
import { getSegment } from 'aws-xray-sdk-core';

@Controller('operations')
export class OperationapiController {
  private readonly logger = new Logger();
  constructor(
    private readonly historyService: HistoryService,
    private readonly parserService: ParserService,
    private readonly workerService: WorkerService,
  ) {}

  @Get()
  getHistoryOperations(): iOperationArray {
    return this.historyService.getAll();
  }

  @Post('/errorlocal')
  async returnErrorLocal(@Res() res: Response) {
    this.logger.log('Creating errors to the api gw');
    this.logger.log('Waiting a 2 seconds to improve x-ray traces');
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    this.logger.log('finish timeout');
    this.logger.log('Forbidden');
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: 'Error in the payload' });
  }

  @Post('/error')
  async returnError(@Res() res: Response) {
    this.logger.log('Creating errors to the api gw');
    const firstSeg = getSegment().addNewSubsegment('Error sub segment');
    this.logger.warn('Waiting a 2 seconds to improve x-ray traces');
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    this.logger.warn('finish timeout');
    firstSeg.close();
    this.logger.error('Forbidden');
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: 'Error in the payload' });
  }

  @Post()
  executeNewOperation(
    @Body('operationText') operationText: string,
    @Res() res: Response,
  ) {
    if (operationText === undefined) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error in the payload' });
    }

    const createOperationDto = new CreateOperationDto();
    createOperationDto.operationText = operationText;

    const operation = this.parserService.parseOperation({
      type: eOperationType.unkown,
      operationText: createOperationDto.operationText,
      result: 0,
      error: false,
      message: '',
    });

    if (operation.error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: operation.message });
    }

    const operationExecuted = this.workerService.executeOperation(operation);

    if (operationExecuted.error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: operationExecuted.message });
    }

    return res.status(HttpStatus.OK).json(operationExecuted);
  }
}
