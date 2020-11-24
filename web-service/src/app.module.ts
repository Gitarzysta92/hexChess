import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { GameSessionModule } from './modules/game-session/game-session.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception-filter/http-exception.filter';
import { EventService } from './core/events/event.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'hex',
      autoLoadModels: true,
      logging: false,
      //synchronize: true,
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    GameSessionModule,
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
