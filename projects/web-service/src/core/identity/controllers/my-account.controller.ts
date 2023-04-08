import { Controller, UseGuards, Get, UseFilters, Delete, Body, Post, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { ModelValidationPipe } from 'src/shared/utils/model-validation-pipe/model-validation.pipe';
import { AccountsService } from '../services/accounts.service';
import { MyAccountDto } from '../models/my-account.dto';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { ServiceExceptionFilter } from 'src/aspects/errors/api';
import { ContextUser, ContextUserData } from 'src/shared/extensions/api';
import { CredentialsDto } from '../models/credentials.dto';
import { PasswordResetDto } from '../models/password-reset.dto';
import { PasswordResetService } from '../services/password-reset.service';

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('MyAccount')
@Controller('accounts/me')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceExceptionFilter)
export class MyAccountController {

  constructor(
    private readonly _accountsService: AccountsService,
    private readonly _passwordResetService: PasswordResetService
  ) { }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyAccount(
    @ContextUser() contextUser: ContextUserData,
  ): Promise<MyAccountDto> {
    const result = await this._accountsService.getAccountByEmail(contextUser.email);
    delete result.password;
    return new MyAccountDto(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateMyAccount(
    @Body(new ModelValidationPipe({ skipMissingProps: true })) myAccount: MyAccountDto,
    @ContextUser() contextUser: ContextUserData,
  ) {
    myAccount.id = contextUser.id;
    return await this._accountsService.updateAccount(myAccount);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteMyUser(
    @ContextUser() contextUser: ContextUserData,
  ) {
    await this._accountsService.deleteAccount(contextUser.id);
  }

  @Post('password/reset')
  async resetPassword(
    @Body(new ModelValidationPipe()) data: PasswordResetDto,
  ) {
    return await this._passwordResetService.sendResetEmail(data.email);
  }

  @Patch('password/:resetPasswordToken')
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