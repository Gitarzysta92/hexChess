import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserRegistrationDto } from '../models/userDto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProfilesService } from '../services/profiles.service';
import { ModelValidationPipe } from 'src/utils/model-validation-pipe/model-validation.pipe';
import { PropsFilterPipe } from 'src/utils/props-filter-pipe/props-filter.pipe';
import { ContextUserData, ContextUser } from 'src/extensions/decorators/context-user.decorator';
import { Response } from 'express';
import { ExistingUserQueryDto } from '../models/existing-user-query.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(
    private _usersService: UsersService,
    private _profilesService: ProfilesService,
  ) {}


  @Post()
  async createUser(
    @Body(ModelValidationPipe) body: UserRegistrationDto
  ) {
    const user = new UserDto(body);
    const { id: userId } = await this._usersService.createUser(user);
    return await this._profilesService.createProfile(userId, body.nickname);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMyUser(
    @Body(
      new PropsFilterPipe(['email', 'password']), 
      new ModelValidationPipe({ skipMissingProps: true })
    ) user: UserDto,
    @ContextUser() contextUser: ContextUserData,
    @Res() res: Response
  ) {
    user.id = contextUser.id;
    const result = await this._usersService.updateUser(user);

    if (result.success) {
      res.status(HttpStatus.OK).json(result.value);
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Get('exists')
  async isExists(
    @Query(new ModelValidationPipe()) query: ExistingUserQueryDto,
    @ContextUser() contextUser: ContextUserData,
  ): Promise<boolean> {

    if (contextUser) {
      query.id = contextUser.id;
    }
    
    return await this._usersService.checkIsUserExists(query);
  }

}