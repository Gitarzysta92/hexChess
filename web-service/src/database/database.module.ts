import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Profile } from './models/profile.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Profile]),
  ],
  exports: [
    SequelizeModule
  ]
})
export class DatabaseModule {}
