import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { BlobStorageModule } from 'src/infrastructure/blob-storage-client/blob-storage-client.module';
import { Profile } from 'src/core/profiles/models/profile.entity';
import { Account } from 'src/core/identity/models/account.entity';
import { MyProfileController } from './controllers/my-profile.controller';


@Module({
  imports: [
    SequelizeModule.forFeature([Account, Profile ]),
    BlobStorageModule.forFeature('avatars'),
  ],
  controllers: [
    ProfilesController, 
    MyProfileController
  ],
  providers: [
    ProfilesService,
  ],
  exports: [
    ProfilesService
  ],
})
export class ProfilesModule {}
 