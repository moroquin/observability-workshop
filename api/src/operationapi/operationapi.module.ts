import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OperationapiController } from './operationapi.controller';
import { ParserService } from '../parser/parser.service';
import { WorkerService } from '../worker/worker.service';
import { HistoryService } from '../history/history.service';
import { LoggerModule } from 'nestjs-pino';
import {
  CorreletaionIdMiddleware,
  CORRELETION_ID_HEADER,
} from 'src/correletaion-id/correletaion-id.middleware';
import { Request } from 'express';

@Module({
  imports: [
    OperationapiModule,
    LoggerModule.forRoot({
      pinoHttp: {
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlation: req[CORRELETION_ID_HEADER],
          };
        },
      },
    }),
  ],
  controllers: [OperationapiController],
  providers: [ParserService, WorkerService, HistoryService],
})
export class OperationapiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorreletaionIdMiddleware).forRoutes('*');
  }
}
