import { Injectable } from '@nestjs/common';
import {
  eOperationType,
  iOperation,
  iOperationParsered,
} from '../common/interface/operation';

@Injectable()
export class ParserService {
  private isANumber(operating: string): boolean {
    return (
      operating != null &&
      operating !== '' &&
      !isNaN(Number(operating.toString()))
    );
  }

  public parseOperation(operation: iOperation): iOperationParsered {
    const operationItems: string[] = operation.operationText.split(',');
    if (operationItems.length !== 3) {
      return {
        operationType: eOperationType.unkown,
        error: true,
        operating1: 0,
        operating2: 0,
        message: 'should be 3 items.',
      };
    }

    const operationType = this.getOperationType(operationItems[1]);
    if (operationType === eOperationType.unkown) {
      return {
        operationType: eOperationType.unkown,
        error: true,
        operating1: 0,
        operating2: 0,
        message: 'Operation type unkown',
      };
    }

    if (
      !this.isANumber(operationItems[0]) ||
      !this.isANumber(operationItems[2])
    ) {
      return {
        operationType: eOperationType.unkown,
        error: true,
        operating1: 0,
        operating2: 0,
        message: 'Operatings are not a number',
      };
    }
    const operating1 = Number(operationItems[0]);
    const operating2 = Number(operationItems[2]);

    return {
      operationType,
      operating1,
      operating2,
      error: false,
      message: '',
    };
  }

  private getOperationType(operationText: string): eOperationType {
    switch (operationText) {
      case '+':
        return eOperationType.addition;
      case '-':
        return eOperationType.substraction;
      case '*':
        return eOperationType.multiplication;
      case '/':
        return eOperationType.division;
      default:
        return eOperationType.unkown;
    }
  }
}
