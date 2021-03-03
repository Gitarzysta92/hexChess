import { Controller, UseGuards, Get, Req, Query, UseFilters, Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Profile } from 'src/database/models/profile.model';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProfileDto } from '../models/profileDto';
import { ProfilesService, ServiceException } from '../services/profiles.service';
import { Request, Response } from 'express';


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





@Controller('profile')
@UseFilters(ServiceExceptionFilter)
export class ProfilesController {


  constructor(
    private _profilesService: ProfilesService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async search(@Query() query: { [key: string]: string }): Promise<ProfileDto> {
    return await this._profilesService.search(query);
  }

  @Get('exists')
  async isExists(@Query() query: { [key: string]: string }): Promise<boolean> {
    return !!await this._profilesService.search(query);
  }


  @UseGuards(JwtAuthGuard)
  @Get('owned')
  getMyProfile(@Req() req) {
    return req.user;
  }
}






