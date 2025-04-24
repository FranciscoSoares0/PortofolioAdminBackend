import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendUrl = app.get<string>('FRONTEND_URL');

  // Enable CORS
  app.enableCors({
    origin: frontendUrl, // allow Angular
    credentials: true, // if you're sending cookies or Authorization headers
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
