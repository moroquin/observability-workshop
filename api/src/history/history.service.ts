
import { Injectable } from '@nestjs/common';
import { eOperationType, iOperation, iOperationArray } from '../common/interface/operation';

@Injectable()
export class HistoryService {
    private operations:iOperation[] = [
    ];
    private id = 0;

    getAll():iOperationArray {
        const operationsResult:iOperation[] = [];
        this.operations.forEach(operation => operationsResult.push(Object.assign({}, operation)));
        return {
            "operations": operationsResult
        };
    }

    pushOperation(operation:iOperation) {
        this.id++;
        this.operations.push(Object.assign({},{...operation,id:this.id}));
    }
}
