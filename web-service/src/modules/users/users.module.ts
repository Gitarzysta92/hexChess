import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { BlobStorageModule } from 'src/utils/blob-storage-client/blob-storage-client.module';
import { MailSenderModule } from 'src/utils/mail-sender/mail-sender.module';
import { AccountController } from './controllers/my-account.controller';

console.log('user.module - resolved');

@Module({
  imports: [
    DatabaseModule,
    BlobStorageModule.forFeature('avatars'),
  ],
  controllers: [UsersController, ProfilesController, AccountController],
  providers: [UsersService, ProfilesService],
  exports: [UsersService, ProfilesService],
})
export class UsersModule {}
