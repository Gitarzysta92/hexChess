import { Module } from '@nestjs/common';
import { ArmiesController } from './controllers/armies.controller';


@Module({
  imports: [],
  controllers: [ArmiesController],
  providers: [],
  exports: [
  ],
})
export class ArmiesModule {}
