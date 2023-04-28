import { Controller, Body, Get, Query, BadRequestException, Post, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { ProfilesService } from '../../profiles/services/profiles.service';
import { ModelValidationPipe } from 'src/shared/utils/model-validation-pipe/model-validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from '../models/registration.dto';
import { ExistingAccountQueryDto } from '../models/existing-account-query.dto';
import { PasswordResetService } from '../services/password-reset.service';
import { CredentialsDto } from '../models/credentials.dto';
import { PasswordResetDto } from '../models/password-reset.dto';
import { Response } from 'express';


@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly _profilesService: ProfilesService,
    private readonly _passwordResetService: PasswordResetService
  ) {}

  @Post()
  async createAccount(
    @Body(ModelValidationPipe) registration: RegistrationDto
  ) {
    if (await this._accountsService.checkIsAccountExists(registration)) {
      throw new BadRequestException();
    }

    if (await this._profilesService.checkNicknameIsTaken(registration.nickname)) {
      throw new BadRequestException();
    }

    const { id: userId } = await this._accountsService.createAccount(registration);
    await this._profilesService.createProfile(userId, registration.nickname);
  }

  @Get('exists')
  async isExists(
    @Query(new ModelValidationPipe()) query: ExistingAccountQueryDto,
  ): Promise<boolean> {
    return await this._accountsService.checkIsAccountExists(query);
  }

  @Post('password/reset')
  async resetPassword(
    @Body(new ModelValidationPipe()) data: PasswordResetDto,
  ) {
    return await this._passwordResetService.sendResetEmail(data.email);
  }

  @Patch('password/reset/:resetPasswordToken')
  async updatePassword(
    @Param('resetPasswordToken') token: string,
    @Body(new ModelValidationPipe()) credentials: CredentialsDto,
    @Res() res: Response 
  ) {
    const userId = await this._passwordResetService.getPasswordResetPrincipal(token, credentials.username);
    if (!userId) {
      return res.status(HttpStatus.GONE).send();
    }
    const result = await this._accountsService.updateAccountPassword(userId, credentials.password);
    return res.status(HttpStatus.OK).json(result);
  }
}