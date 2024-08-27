import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { bootstrapLambda } from './lambda.bootstrap';
import { OperationapiModule } from './operationapi/operationapi.module';

function attachPipes(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();
}

if (process.env.NODE_ENV === 'local') {
  async function bootstrap() {
    const app = await NestFactory.create(OperationapiModule);
    attachPipes(app);
    await app.listen(4200);
  }

  bootstrap();
}

const handler = async (event: any, context: any, callback: any) => {
  console.log('Event', event);
  const server = await bootstrapLambda(attachPipes);
  return server(event, context, callback);
};

module.exports.handler = handler;
