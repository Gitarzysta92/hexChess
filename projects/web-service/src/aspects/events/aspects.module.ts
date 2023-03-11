import { Module } from '@nestjs/common';
import { EventService } from './services/events/event.service';
import { SystemConfiguration } from './services/configuration/system-configuration.service';


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
export class AspectsModule {}
