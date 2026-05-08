import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Car Zone API')
    .setDescription('Car Zone Backend API Documentation')
    .setVersion('1.0')
    .addTag('cars', 'Car management endpoints')
    .addTag('used-cars', 'Used cars management endpoints')
    .addTag('brands', 'Brand management endpoints')
    .addTag('body-types', 'Body type management endpoints')
    .addTag('fuel-types', 'Fuel type management endpoints')
    .addTag('transmissions', 'Transmission management endpoints')
    .addTag('spare-parts', 'Spare parts management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger docs available at: http://localhost:3000/api');
}
bootstrap();
