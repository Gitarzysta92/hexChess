import { Controller, UseGuards, Get, Req, Query, UseFilters, Catch, ExceptionFilter, ArgumentsHost, HttpStatus, Post, Put, Delete, Body, UnauthorizedException, Patch, Param, ValidationPipe, Res, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProfileDto } from '../models/profileDto';
import { ProfilesService, QueryAction, ServiceException } from '../services/profiles.service';
import { Request, Response } from 'express';
import { PropsFilterPipe } from 'src/utils/props-filter-pipe/props-filter.pipe';
import { NotEmptyValidatorPipe } from 'src/utils/not-empty-validator-pipe/not-empty-validator.pipe';
import { AssignedArmyDto } from '../models/assigned-army.dto';
import { ModelValidationPipe } from 'src/utils/model-validation-pipe/model-validation.pipe';
import { User } from 'src/core/extensions/decorators/context-user.decorator';
import { ContextUser } from 'src/core/models/context-user';
import { FileInterceptor } from '@nestjs/platform-express';


@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof ServiceException
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}


interface HttpRequest {
  user?: { id: number, email: string }
}



@Controller('profiles')
@UseFilters(ServiceExceptionFilter)
export class ProfilesController {


  constructor(
    private _profilesService: ProfilesService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async search(@Query() query: { [key: string]: string }): Promise<ProfileDto[]> {
    return await this._profilesService.search(query);
  }

  @Get('exists')
  async isExists(@Query() query: { [key: string]: string }): Promise<boolean> {
    return await this._profilesService.checkIsProfileExists(query);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req) {
    return await this._profilesService.getProfile(req.user?.id)
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @Req() req,
    @Body(new PropsFilterPipe(['nickname', 'avatarUrl', 'languageId']), NotEmptyValidatorPipe) profile
  ) {
    const profileId = await this._profilesService.getProfileId(req.user?.id);
    if (!profileId) throw new UnauthorizedException();

    profile.id = profileId;
    return await this._profilesService.updateProfile(profile)
  }


  @Put('me/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar')) 
  async updateMyAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @User() user: ContextUser,
  ) {
    if (!avatar) {
      throw new BadRequestException();
    }


    const profileId = await this._profilesService.getProfileId(user?.id);
    if (!profileId) throw new UnauthorizedException();

    const result = await this._profilesService.updateAvatar(profileId, avatar.originalname, avatar.buffer);

    return result
  }



  //
  // Assigned armies
  //

  @Post('me/armies')
  @UseGuards(JwtAuthGuard)
  async synchronizeAssignedArmies(
    @Body(new ModelValidationPipe({ explicitModel: [AssignedArmyDto] })) armies: AssignedArmyDto[],
    @User() user: ContextUser
  ) {
    const profileId = await this._profilesService.getProfileId(user?.id);
    if (!profileId) throw new UnauthorizedException();

    armies.forEach(a => a.profileId = profileId);
    const result = await this._profilesService.synchronizeAssignedArmies(armies, profileId);
    return result.value; 
  }


  @Put('me/armies')
  @UseGuards(JwtAuthGuard)
  async createOrUpdateAssignedArmy(
    @Body(ModelValidationPipe) army: AssignedArmyDto,
    @User() user: ContextUser,
    @Res() res: Response
  ) {
    const profileId = await this._profilesService.getProfileId(user?.id);
    if (!profileId) throw new UnauthorizedException();

    army.profileId = profileId;
    const result = await this._profilesService.createOrUpdateAssignedArmy(army);
    
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


  @Patch('me/armies/:priority')
  @UseGuards(JwtAuthGuard)
  async updateAssignedArmy(
    @Param('priority') priority: number,
    @Body(new PropsFilterPipe(['armyId']), NotEmptyValidatorPipe) army: AssignedArmyDto,
    @User() user: ContextUser,
    @Res() res: Response
  ) {
    const profileId = await this._profilesService.getProfileId(user?.id);
    if (!profileId) throw new UnauthorizedException();

    army.priority = priority;
    army.profileId = profileId;
    const result = await this._profilesService.updateAssignedArmy(army);

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


  @Delete('me/armies/:priority')
  @UseGuards(JwtAuthGuard)
  async deleteAssignedArmy(
    @Param('priority') priority: number,
    @User() user: ContextUser,
    @Res() res: Response
  ) {
    const profileId = await this._profilesService.getProfileId(user?.id);
    if (!profileId) throw new UnauthorizedException();

    const result = await this._profilesService.deleteAssignedArmy(priority, profileId);

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






