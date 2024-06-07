import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-handlers/exception.handler';
import { useContainer } from 'class-validator';

async function bootstrap() {
  console.log('Starting API Gateway');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
  console.log('API Gateway started');
}
bootstrap();
