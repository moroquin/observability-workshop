import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as serverlessExpress from '@codegenie/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { OperationapiModule } from './operationapi/operationapi.module';


let cachedServer: any;

export const bootstrapLambda = async (
  attachPipes: (app: INestApplication<any>) => void,
) => {
  if (!cachedServer) {
    // create an express app
    const expressApp = express();

    // create an express adapter to work with nest applicaiton
    const expressAdapter = new ExpressAdapter(expressApp);

    // create a nest app using the express adapter
    const nestApp = await NestFactory.create(OperationapiModule, expressAdapter);
    nestApp.enableCors();

    // configure nest application
    attachPipes(nestApp);

    // wait for the nest to initialise
    await nestApp.init();

    // create a serverless server using serverless express
    cachedServer = serverlessExpress.configure({ app: expressApp });

    return cachedServer;
  }

  return cachedServer;
};
