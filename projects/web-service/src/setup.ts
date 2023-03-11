import { INestApplication } from '@nestjs/common';

import * as passport from 'passport';

//import MySQLSessionStore from "express-mysql-session";

export function setup(app: INestApplication): void {
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   }),
  // );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
}