import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { GameSessionGateway } from './gateways/game-session/game-session.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

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
      //synchronize: true,
    }),
    AuthModule,
    UsersModule,
    DatabaseModule
  ],
  providers: [
    GameSessionGateway 
  ],
})
export class AppModule {}
