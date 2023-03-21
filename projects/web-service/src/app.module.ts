import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MailSenderModule } from './utils/mail-sender/mail-sender.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig, MysqlDatabaseConfig, MYSQL_DATABASE_CONFIG } from './configs/sql-database.config';
import { SmtpMailerConfig, smtpMailerConfig, SMTP_MAILER_CONFIG } from './configs/smtp-mailer.config';
import { BlobStorageModule } from './utils/blob-storage-client/blob-storage-client.module';
import { BlobStorageConfig, blobStorageConfig, BLOB_STORAGE_CONFIG } from './configs/blob-storage.config';
import { MatchmakingModule } from './modules/matchmaking/matchmaking.module';
import { GameModule } from './modules/game/game.module';
import { ArmiesModule } from './modules/armies/armies.module';


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (configService: ConfigService) => configService.get<MysqlDatabaseConfig>(MYSQL_DATABASE_CONFIG) as any,
      inject: [ConfigService],
    }),
    MailSenderModule.forRootAsync({
      imports: [ConfigModule.forFeature(smtpMailerConfig)],
      useFactory: (configService: ConfigService) => configService.get<SmtpMailerConfig>(SMTP_MAILER_CONFIG) as any,
      inject: [ConfigService]
    }),
    BlobStorageModule.forRootAsync({
      imports: [ConfigModule.forFeature(blobStorageConfig)],
      useFactory: (configService: ConfigService) => configService.get<BlobStorageConfig>(BLOB_STORAGE_CONFIG) as any,
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    GameModule,
    MatchmakingModule,
    ArmiesModule
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
