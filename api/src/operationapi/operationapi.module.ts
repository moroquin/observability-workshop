import { Module } from '@nestjs/common';
import { OperationapiController } from './operationapi.controller';
import { ParserService } from '../parser/parser.service';
import { WorkerService } from '../worker/worker.service';
import { HistoryService } from '../history/history.service';

@Module({
  imports: [OperationapiModule],
  controllers: [ OperationapiController],
  providers: [ParserService, WorkerService, HistoryService],
})
export class OperationapiModule {}
