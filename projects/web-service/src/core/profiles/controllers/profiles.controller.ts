import { Controller, UseGuards, Get, Query, UseFilters, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { ProfileDto } from '../models/profile.dto';
import { ProfilesService } from '../services/profiles.service';
import { ServiceExceptionFilter } from 'src/aspects/errors/service-exception-filter';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { ModelValidationPipe } from 'src/shared/utils/api';
import { ProfileQueryDto } from '../models/profile-query.dto';

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('Profiles')
@Controller('profiles')
@UseFilters(ServiceExceptionFilter)
export class ProfilesController {

  constructor(
    private _profilesService: ProfilesService,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async search(
    @Query(new ModelValidationPipe()) query: ProfileQueryDto
  ): Promise<ProfileDto[]> {
    return await this._profilesService.search(query);
  }

  @Get('exists')
  async isExists(
    @Query(new ModelValidationPipe()) query: ProfileQueryDto
  ): Promise<boolean> {
    return await this._profilesService.checkIsProfileExists(query);
  }

  @Get('nickname/exists/:nickname')
  async nicknameExists(
    @Param('nickname') nickname: string,
  ): Promise<boolean> {
    return await this._profilesService.checkNicknameIsTaken(nickname);
  }

}