import { iOperation, iOperationArray } from '../common/interface/operation';
export declare class HistoryService {
    private operations;
    private id;
    getAll(): iOperationArray;
    pushOperation(operation: iOperation): void;
}
