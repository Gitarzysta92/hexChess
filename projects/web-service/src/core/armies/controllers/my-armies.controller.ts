import { Controller, UseGuards, Get, UseFilters, HttpStatus, Post, Put, Delete, Body, Patch, Param, Res } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { Response } from 'express';
import { PropsFilterPipe } from 'src/shared/utils/props-filter-pipe/props-filter.pipe';
import { NotEmptyValidatorPipe } from 'src/shared/utils/not-empty-validator-pipe/not-empty-validator.pipe';
import { AssignedArmyDto } from '../../armies/models/assigned-army.dto';
import { ModelValidationPipe } from 'src/shared/utils/model-validation-pipe/model-validation.pipe';
import { ServiceExceptionFilter } from 'src/aspects/errors/service-exception-filter';
import { ContextUser, ContextUserData } from 'src/shared/extensions/api';
import { QueryAction } from 'src/infrastructure/sql-database/api';
import { ApiBody, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { ArmiesService } from '../services/armies.service';

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('MyArmies')
@Controller('armies/me')
@UseFilters(ServiceExceptionFilter)
export class MyArmiesController {

  constructor(
    private _armiesService: ArmiesService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyAssignedArmies(@ContextUser() user: ContextUserData) {
    return await this._armiesService.getAssignedArmies(user.profileId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    isArray: true,
    type: AssignedArmyDto,
  })
  async synchronizeAssignedArmies(
    @Body(new ModelValidationPipe({ explicitModel: [AssignedArmyDto] })) armies: AssignedArmyDto[],
    @ContextUser() user: ContextUserData
  ) {
    armies.forEach(a => a.profileId = user.profileId);
    const result = await this._armiesService.synchronizeAssignedArmies(armies, user.profileId);
    return result.value; 
  }


  @Put()
  @UseGuards(JwtAuthGuard)
  async createOrUpdateAssignedArmy(
    @Body(ModelValidationPipe) army: AssignedArmyDto,
    @ContextUser() user: ContextUserData,
    @Res() res: Response
  ) {
   
    army.profileId = user.profileId;
    const result = await this._armiesService.createOrUpdateAssignedArmy(army);
    
    switch(result.action) {
      case QueryAction.Created: {
        res.status(HttpStatus.CREATED).json(result.value)
        break;
      } 
      case QueryAction.Updated: {
        res.status(HttpStatus.OK).json(result.value)
        break;
      }
    }
  }


  @Patch(':priority')
  @UseGuards(JwtAuthGuard)
  async updateAssignedArmy(
    @Param('priority') priority: number,
    @Body(new PropsFilterPipe(['armyId']), NotEmptyValidatorPipe) army: AssignedArmyDto,
    @ContextUser() user: ContextUserData,
    @Res() res: Response
  ) {
    army.profileId = user.profileId;
    army.priority = priority;
    const result = await this._armiesService.updateAssignedArmy(army);

    switch(result.action) {
      case QueryAction.Updated: {
        res.status(HttpStatus.OK).json(result.value);
        break;
      } 
      case QueryAction.Failed: {
        res.status(HttpStatus.NOT_FOUND).send();
        break;
      }
    }
  }


  @Delete(':priority')
  @UseGuards(JwtAuthGuard)
  async deleteAssignedArmy(
    @Param('priority') priority: number,
    @ContextUser() user: ContextUserData,
    @Res() res: Response
  ) {
    const result = await this._armiesService.deleteAssignedArmy(priority, user.profileId);

    switch(result.action) {
      case QueryAction.Deleted: {
        res.status(HttpStatus.NO_CONTENT).send();
        break;
      } 
      case QueryAction.Failed: {
        res.status(HttpStatus.NOT_FOUND).send();
        break;
      }
    }
  }
}