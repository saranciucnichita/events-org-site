import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.enableCors({
    origin: 'http://localhost:3000', // URL Next.js
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe()); // Global DTO validation

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
