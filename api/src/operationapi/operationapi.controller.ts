import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { CreateOperationDto } from '../common/dto/CreateOperationDto';
import { ParserService } from '../parser/parser.service';
import { WorkerService } from '../worker/worker.service';
import { Response } from 'express';
import { eOperationType, iOperationArray } from '../common/interface/operation';

@Controller('operations')
export class OperationapiController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly parserService: ParserService,
    private readonly workerService: WorkerService
  ) {}

  @Get()
  getHistoryOperations(): iOperationArray {
    console.log("holitas holitas")
    return this.historyService.getAll();
  }

  @Post()
  executeNewOperation(
    @Body() createOperationDto: CreateOperationDto,
    @Res() res: Response
  ) {
    console.log("holitas holitas")
    if (createOperationDto.operationText === undefined) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error in the payload' });
    }

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
