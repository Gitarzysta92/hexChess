import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';
require('dotenv').config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);
  await app.listen(
    process.env.WEB_SERVICE_PORT || 3000, 
    process.env.WEB_SERVICE_HOST || 'localhost'
  );
}
bootstrap();