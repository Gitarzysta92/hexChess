import { Controller, Post, Res, UseGuards, Get, Body } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../services/authentication.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContextUser, ContextUserData } from 'src/shared/extensions/api';
import { ProfilesService } from 'src/core/profiles/services/profiles.service';
import { CredentialsDto } from '../models/credentials.dto';
import { ModelValidationPipe } from 'src/shared/utils/model-validation-pipe/model-validation.pipe';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _profilesService: ProfilesService,
  ) { }
  
  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async authenticate(
    @Body(new ModelValidationPipe({ skipMissingProps: true })) _: CredentialsDto,
    @ContextUser() contextUser: ContextUserData,
    @Res() res: Response
  ) {
    const profile = await this._profilesService.getProfileByAccountId(contextUser.id);
    const token = await this._authenticationService.getToken(contextUser.id, { profileId: profile.id });
    if (!token) {
      res.status(401).send();
    }
    res.send(token);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('refresh-token')
  async refreshToken(
    @ContextUser() contextUser: ContextUserData
  ) {
    return await this._authenticationService.getToken(contextUser.id, { profileId: contextUser.profileId });
  }

}
