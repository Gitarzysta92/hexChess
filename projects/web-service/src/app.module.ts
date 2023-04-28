import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesModule } from './core/profiles/profiles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig, MysqlDatabaseConfig, MYSQL_DATABASE_CONFIG } from './infrastructure/sql-database/sql-database.config';
import { BlobStorageModule } from './infrastructure/blob-storage-client/blob-storage-client.module';
import { BlobStorageConfig, blobStorageConfig, BLOB_STORAGE_CONFIG } from './infrastructure/blob-storage-client/blob-storage.config';
import { MatchmakingModule } from './core/matchmaking/matchmaking.module';
import { GameModule } from './core/game/game.module';
import { ArmiesModule } from './core/armies/armies.module';
import { IdentityModule } from './core/identity/identity.module';
import { SwaggerCustomizationModule } from './infrastructure/swagger-customization/swagger-customization.module';


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (configService: ConfigService) => configService.get<MysqlDatabaseConfig>(MYSQL_DATABASE_CONFIG) as any,
      inject: [ConfigService],
    }),
    BlobStorageModule.forRootAsync({
      imports: [ConfigModule.forFeature(blobStorageConfig)],
      useFactory: (configService: ConfigService) => configService.get<BlobStorageConfig>(BLOB_STORAGE_CONFIG) as any,
      inject: [ConfigService]
    }),
    IdentityModule,
    ProfilesModule,
    GameModule,
    MatchmakingModule,
    ArmiesModule,
    SwaggerCustomizationModule
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
