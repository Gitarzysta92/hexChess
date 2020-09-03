import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserService } from './services/user/user.service';
import { GameSessionGateway } from './gateways/game-session/game-session.gateway';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'hex',
      models: [User], 
    }),
    SequelizeModule.forFeature([User])
  ],
  controllers: [
    AppController,
    UserController
  ],
  providers: [
    AppService,
    UserService,
    GameSessionGateway 
  ],
})
export class AppModule {}
