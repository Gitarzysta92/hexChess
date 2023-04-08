import { Controller, Body, Get, Query, Put, BadRequestException, Post } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { ProfilesService } from '../../profiles/services/profiles.service';
import { ModelValidationPipe } from 'src/shared/utils/model-validation-pipe/model-validation.pipe';
import { ContextUser } from 'src/shared/extensions/decorators/context-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from '../models/registration.dto';
import { ContextUserData } from 'src/shared/extensions/api';
import { ExistingAccountQueryDto } from '../models/existing-account-query.dto';


@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    private _accountsService: AccountsService,
    private _profilesService: ProfilesService,
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
    @ContextUser() contextUser: ContextUserData,
  ): Promise<boolean> {

    if (contextUser) {
      query.id = contextUser.id;
    }
    
    return await this._accountsService.checkIsAccountExists(query);
  }
}