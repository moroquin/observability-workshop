import { HistoryService } from '../history/history.service';
import { CreateOperationDto } from '../common/dto/CreateOperationDto';
import { ParserService } from '../parser/parser.service';
import { WorkerService } from '../worker/worker.service';
import { Response } from 'express';
import { iOperationArray } from '../common/interface/operation';
export declare class OperationapiController {
    private readonly historyService;
    private readonly parserService;
    private readonly workerService;
    constructor(historyService: HistoryService, parserService: ParserService, workerService: WorkerService);
    getHistoryOperations(): iOperationArray;
    executeNewOperation(createOperationDto: CreateOperationDto, res: Response): Response<any, Record<string, any>>;
}
