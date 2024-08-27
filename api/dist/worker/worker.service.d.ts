import { iOperation, iOperationParsered } from '../common/interface/operation';
import { HistoryService } from '../history/history.service';
export declare class WorkerService {
    private readonly historyService;
    constructor(historyService: HistoryService);
    executeOperation(operation: iOperationParsered): iOperation;
    private execute;
    private addition;
    private substraction;
    private multiplication;
    private division;
    private unkown;
}
