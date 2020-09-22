import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { GameSessionModule } from './modules/game-session/game-session.module';

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
      define: {
        timestamps: false,
      },
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    GameSessionModule,
  ],
  providers: [],
})
export class AppModule {}
