import { Controller, UseGuards, Get, UseFilters, Catch, ExceptionFilter, ArgumentsHost, HttpStatus, Delete, Body, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ServiceException } from '../services/profiles.service';
import { Request, Response } from 'express';
import { ModelValidationPipe } from 'src/utils/model-validation-pipe/model-validation.pipe';
import { User } from 'src/core/extensions/decorators/context-user.decorator';
import { ContextUser } from 'src/core/models/context-user';
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