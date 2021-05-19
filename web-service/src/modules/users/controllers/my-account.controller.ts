import { Controller, UseGuards, Get, Req, Query, UseFilters, Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus, Post, Put, Delete, Body, UnauthorizedException, Patch, Param, ValidationPipe, Res, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { Profile } from 'src/database/models/profile.model';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProfileDto } from '../models/profileDto';
import { ProfilesService, QueryAction, ServiceException } from '../services/profiles.service';
import { Request, Response } from 'express';
import { PropsValidationPipe } from 'src/utils/props-validation-pipe/props-validation.pipe';
import { PropsFilterPipe } from 'src/utils/props-filter-pipe/props-filter.pipe';
import { NotEmptyValidatorPipe } from 'src/utils/not-empty-validator-pipe/not-empty-validator.pipe';
import { AssignedArmy } from 'src/database/models/assigned-army.model';
import { AssignedArmyDto } from '../models/assigned-army.dto';
import { ModelValidationPipe } from 'src/utils/model-validation-pipe/model-validation.pipe';
import { User } from 'src/core/extensions/decorators/context-user.decorator';
import { ContextUser } from 'src/core/models/context-user';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../services/users.service';
import { UserDto } from '../models/userDto';
import { MyAccountDto } from '../models/my-account.dto';


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



@Controller('account')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceExceptionFilter)
export class AccountController {


  constructor(
    private _userService: UsersService,
  ) { }

  @Get()
  async getMyAccount(
    @User() user: ContextUser,
  ): Promise<MyAccountDto> {
    const result = await this._userService.getUser(user.email);
    return new MyAccountDto(result);
  }

  @Patch()
  async updateMyAccount(
    @Body(new ModelValidationPipe({ skipMissingProps: true })) myAccount: MyAccountDto,
    @User() user: ContextUser,
  ) {

    const userData = new UserDto(myAccount);
    userData.id = user.id;
    return await this._userService.updateUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteMyUser(
    @User() contextUser: ContextUser,
  ) {
    await this._userService.deleteUser(contextUser.id);
  }


}






