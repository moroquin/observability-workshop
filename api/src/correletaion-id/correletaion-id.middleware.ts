import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const CORRELETION_ID_HEADER = 'X-Correletion-Id';

@Injectable()
export class CorreletaionIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = randomUUID();
    req[CORRELETION_ID_HEADER] = id;
    res.set(CORRELETION_ID_HEADER, id);
    next();
  }
}
