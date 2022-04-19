import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { BlobStorageModule } from 'src/utils/blob-storage-client/blob-storage-client.module';
import { AccountController } from './controllers/my-account.controller';
import { AssignedArmy } from 'src/db-models/assigned-army';
import { Profile } from 'src/db-models/profile';
import { User } from 'src/db-models/user';



@Module({
  imports: [
    SequelizeModule.forFeature([User, Profile, AssignedArmy]),
    BlobStorageModule.forFeature('avatars'),
  ],
  controllers: [UsersController, ProfilesController, AccountController],
  providers: [UsersService, ProfilesService],
  exports: [UsersService, ProfilesService],
})
export class UsersModule {}
 