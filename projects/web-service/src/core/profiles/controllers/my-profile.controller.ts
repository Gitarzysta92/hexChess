import { Controller, UseGuards, Get, Req, UseFilters, Put, Body, Patch, UseInterceptors, UploadedFile, BadRequestException, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { ProfilesService } from '../services/profiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiceExceptionFilter } from 'src/aspects/errors/service-exception-filter';
import { ContextUser, ContextUserData } from 'src/shared/extensions/api';
import { ApiBody, ApiConsumes, ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { ModelValidationPipe } from 'src/shared/utils/api';
import { MyProfileQueryDto } from '../models/my-profile-query.dto';

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('MyProfile')
@Controller('profiles')
@UseFilters(ServiceExceptionFilter)
export class MyProfileController {

  constructor(
    private _profilesService: ProfilesService,
  ) { }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req) {
    return await this._profilesService.getProfileByAccountId(req.user?.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @ContextUser() user: ContextUserData,
    @Body(new ModelValidationPipe()) profile: MyProfileQueryDto
  ) {
    Object.assign(profile, { id: user.profileId });
    return await this._profilesService.updateProfile(profile);
  }

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('avatar')) 
  async updateMyAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @ContextUser() user: ContextUserData,
  ) {
    if (!avatar) {
      throw new BadRequestException();
    }

    return await this._profilesService.updateAvatar(user.profileId, avatar.originalname, avatar.buffer);
  }

}