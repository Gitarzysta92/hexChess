import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { requestInterceptor, SWAGGER_CUSTOM_JS_FILENAME } from './infrastructure/swagger-customization/api';
import { setup } from './setup';

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);

  const config = new DocumentBuilder()
  .setTitle('HexChess service')
  .setDescription('The HexChess service API description')
  .setVersion('1.0')
  .addOAuth2({
    type: "oauth2",
    description: "description",
    name: "CustomOAuth",
    flows: {
      password: {
        tokenUrl: `http://localhost:3000/authentication/authenticate`,
        scopes: {},
      }
    }
  }, "CustomOAuth")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customJs: SWAGGER_CUSTOM_JS_FILENAME,
    swaggerOptions: {
      requestInterceptor: requestInterceptor
    },
  });


  await app.listen(
    process.env.WEB_SERVICE_PORT || 3000, 
    process.env.WEB_SERVICE_HOST || 'localhost'
  );
}
bootstrap();