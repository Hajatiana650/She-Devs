import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('She-Devs API')
    .setDescription('Documentation de l\'API She-Devs')
    .setVersion('1.0')
    .addBearerAuth() // si tu utilises JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // accessible sur /api

  await app.listen(3000);
}
bootstrap();