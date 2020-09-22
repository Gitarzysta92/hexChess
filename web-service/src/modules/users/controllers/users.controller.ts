import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Delete,
  Param,
  Put,
  Session,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../models/userDto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProfilesService } from '../services/profiles.service';
import { isNullOrUndefined } from 'util';

@Controller('user')
export class UsersController {
  constructor(
    private _usersService: UsersService,
    private _profilesService: ProfilesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createUser(@Body() body: UserDto) {
    const user = new UserDto({
      email: body.email,
      password: body.password,
    });

    const { id: userId } = await this._usersService.createUser(user);
    if (isNullOrUndefined(userId)) return;

    await this._profilesService.createProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateUser(@Param('userId') userId: number) {
    await this._profilesService.updateProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    const result = this._usersService.removeUser(userId);

    return result;
  }
}
