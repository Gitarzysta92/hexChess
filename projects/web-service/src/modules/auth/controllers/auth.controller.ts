import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  Credentials,
  GuestCredentials,
} from '../models/credentials';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDto } from 'src/modules/users/models/userDto';

import { ModelValidationPipe } from 'src/utils/model-validation-pipe/model-validation.pipe';
import { UsersService } from 'src/modules/users/services/users.service';
import { PasswordReset } from '../models/password-reset-email';
import { ContextUserData, ContextUser } from 'src/extensions/decorators/context-user.decorator';





@Controller()
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async authenticate(@Req() req: Request & { user: UserDto }, @Res() res: Response) {
    const token = await this._authService.getToken(req.user.id);

    if (!token) {
      res.status(401).send();
    }

    res.send(token);
  }

  @Post('authenticate-guest')
  async authenticateGuest(
    @Body() body: GuestCredentials,
    @Res() res: Response,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request & { logOut: () => void  }) {
    req.logOut();
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh-token')
  async refreshToken(
    @ContextUser() user: ContextUserData
  ) {
    return await this._authService.getToken(user.id);
  }


  @Post('password')
  async resetPassword(
    @Body(new ModelValidationPipe()) data: PasswordReset,
  ) {
    return await this._authService.sendResetEmail(data.email);
  }


  @Patch('password/:resetPasswordToken')
  async updatePassword(
    @Param('resetPasswordToken') token: string,
    @Body(new ModelValidationPipe()) credentials: Credentials,
    @Res() res: Response 
  ) {
    const userId = await this._authService.getPasswordResetPrincipal(token, credentials.username);
    if (!userId) {
      return res.status(HttpStatus.GONE).send();
    }
    const result = await this._usersService.updateUserPassword(userId, credentials.password);
    return res.status(HttpStatus.OK).json(result);
  }

}
