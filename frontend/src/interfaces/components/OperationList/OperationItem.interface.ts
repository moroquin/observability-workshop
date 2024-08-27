
export interface iProps{
    id: number, 
    operation: iOperation, 
}

interface iOperation {
    type: string,
    operationText: string,
    result: number,
    error: boolean,
    message: string
    id:number
  }