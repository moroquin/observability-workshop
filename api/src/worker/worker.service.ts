import { Injectable } from '@nestjs/common';
import {
  eOperationType,
  iOperation,
  iOperationParsered,
  iOperationResult,
} from '../common/interface/operation';
import { HistoryService } from '../history/history.service';

@Injectable()
export class WorkerService {
  constructor(private readonly historyService: HistoryService) {}

  executeOperation(operation: iOperationParsered): iOperation {
    const partialResult = this.execute(operation);

    const result: iOperation = {
      ...partialResult,
      operationText: `${operation.operating1} ${operation.operationType} ${operation.operating2} = ${partialResult.error ? '' : partialResult.result}`,
      type: operation.operationType,
    };
    if (result.error) {
      return result;
    }

    this.historyService.pushOperation(result);

    return result;
  }

  private execute(operation: iOperationParsered): iOperationResult {
    switch (operation.operationType) {
      case eOperationType.addition:
        return this.addition(operation);
      case eOperationType.substraction:
        return this.substraction(operation);
      case eOperationType.multiplication:
        return this.multiplication(operation);
      case eOperationType.division:
        return this.division(operation);
      default:
        return this.unkown();
    }
  }

  private addition(operation: iOperationParsered): iOperationResult {
    return {
      result: operation.operating1 + operation.operating2,
      message: 'No error',
      error: false,
    };
  }

  private substraction(operation: iOperationParsered): iOperationResult {
    return {
      result: operation.operating1 - operation.operating2,
      message: 'No error',
      error: false,
    };
  }

  private multiplication(operation: iOperationParsered): iOperationResult {
    return {
      result: operation.operating1 * operation.operating2,
      message: 'No error',
      error: false,
    };
  }

  private division(operation: iOperationParsered): iOperationResult {
    if (operation.operating2 === 0) {
      return {
        result: 0,
        message: 'Division by zero',
        error: true,
      };
    }
    return {
      result: operation.operating1 / operation.operating2,
      message: 'No error',
      error: false,
    };
  }

  private unkown(): iOperationResult {
    return {
      result: 0,
      message: 'Unkown operation',
      error: true,
    };
  }
}
