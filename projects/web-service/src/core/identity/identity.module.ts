import { Module } from '@nestjs/common';
import { ProfilesModule } from '../profiles/profiles.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/strategies/jwt.strategy';
import { SessionSerializer } from './passport/session.serialize';
import { MailSenderModule } from 'src/infrastructure/mail-sender/mail-sender.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthTokenConfig, jwtAuthTokenConfig, JWT_AUTH_TOKEN_CONFIG } from 'src/core/identity/configs/jwt-auth-token.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/core/identity/models/account.entity';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { PasswordResetService } from './services/password-reset.service';
import { AccountsService } from './services/accounts.service';
import { MyAccountController } from './controllers/my-account.controller';
import { AccountsController } from './controllers/accounts.controller';

@Module({
  imports: [
    ProfilesModule,
    ConfigModule,
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
    SequelizeModule.forFeature([Account])
  ],
  controllers: [
    AuthenticationController,
    MyAccountController,
    AccountsController
  ],
  providers: [
    AuthenticationService,
    PasswordResetService,
    AccountsService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer
  ],
  exports: [
    PassportModule
  ],
})
export class IdentityModule {}
