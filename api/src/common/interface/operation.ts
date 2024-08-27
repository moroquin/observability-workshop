export enum eOperationType{
    addition = "addition",
    substraction = "substraction",
    multiplication = "multiplication", 
    division = "division", 
    unkown = "unkown"
}

export interface iOperation {
  type: eOperationType,
  operationText: string,
  result: number,
  error: boolean,
  message: string
  id?:number
}

export interface iOperationParsered{
    operationType: eOperationType, 
    operating1: number, 
    operating2: number,
    error: boolean, 
    message: string
}

export interface iOperationResult{
    result: number, 
    message: string, 
    error: boolean
}

export interface iOperationArray {
  operations: iOperation[];
}
