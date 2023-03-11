import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setup } from './setup';

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);

  const config = new DocumentBuilder()
  .setTitle('HexChess service')
  .setDescription('The HexChess service API description')
  .setVersion('1.0')
  .addTag('alpha')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(
    process.env.WEB_SERVICE_PORT || 3000, 
    process.env.WEB_SERVICE_HOST || 'localhost'
  );
}
bootstrap();