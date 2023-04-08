import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArmiesController } from './controllers/armies.controller';
import { MyArmiesController } from './controllers/my-armies.controller';
import { AssignedArmy } from './models/assigned-army.entity';
import { ArmiesService } from './services/armies.service';


@Module({
  imports: [
    SequelizeModule.forFeature([AssignedArmy]),
  ],
  controllers: [
    MyArmiesController,
    ArmiesController
  ],
  providers: [
    ArmiesService
  ],
  exports: [
    ArmiesService
  ],
})
export class ArmiesModule {}
