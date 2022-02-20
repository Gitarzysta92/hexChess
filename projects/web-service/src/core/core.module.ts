import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { EventService } from './events/event.service';
import { SystemConfiguration } from './system-configuration.service';



@Module({
  imports: [
  ],
  providers: [
    EventService,
    SystemConfiguration
  ],
  exports: [
    EventService,
    SystemConfiguration
  ]
})
export class CoreModule {}
