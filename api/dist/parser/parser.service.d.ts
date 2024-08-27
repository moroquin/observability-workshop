import { iOperation, iOperationParsered } from '../common/interface/operation';
export declare class ParserService {
    private isANumber;
    parseOperation(operation: iOperation): iOperationParsered;
    private getOperationType;
}
