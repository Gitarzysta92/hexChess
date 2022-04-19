import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { SessionSerializer } from './session.serialize';
import { MailSenderModule } from 'src/utils/mail-sender/mail-sender.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthTokenConfig, jwtAuthTokenConfig, JWT_AUTH_TOKEN_CONFIG } from 'src/configs/jwt-auth-token.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'hexchess-database';



@Module({
  imports: [
    UsersModule,
    MailSenderModule.forFeature(),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
      
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtAuthTokenConfig)],
      useFactory: (configService: ConfigService) => configService.get<JwtAuthTokenConfig>(JWT_AUTH_TOKEN_CONFIG) as any,
      inject: [ConfigService]
    }),
    SequelizeModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
