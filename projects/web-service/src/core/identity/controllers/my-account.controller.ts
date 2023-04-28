import { Controller, UseGuards, Get, UseFilters, Delete, Body, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/identity/guards/jwt-auth.guard';
import { ModelValidationPipe } from 'src/shared/utils/model-validation-pipe/model-validation.pipe';
import { AccountsService } from '../services/accounts.service';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { ServiceExceptionFilter } from 'src/aspects/errors/api';
import { ContextUser, ContextUserData } from 'src/shared/extensions/api';
import { MyAccountUpdateDto } from '../models/my-account-update.dto';
import { AccountDto } from '../models/account.dto';

@ApiOAuth2([], 'CustomOAuth')
@ApiTags('MyAccount')
@Controller('accounts/me')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceExceptionFilter)
export class MyAccountController {

  constructor(
    private readonly _accountsService: AccountsService
  ) { }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyAccount(
    @ContextUser() contextUser: ContextUserData,
  ): Promise<AccountDto> {
    const result = await this._accountsService.getAccountByEmail(contextUser.email);
    delete result.password;
    return new AccountDto(result);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateMyAccount(
    @Body(new ModelValidationPipe({ skipMissingProps: true })) myAccount: MyAccountUpdateDto,
    @ContextUser() contextUser: ContextUserData,
  ) {
    Object.assign(myAccount, { id: contextUser.id })
    return await this._accountsService.updateAccount(myAccount);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteMyUser(
    @ContextUser() contextUser: ContextUserData,
  ) {
    await this._accountsService.deleteAccount(contextUser.id);
  }
}