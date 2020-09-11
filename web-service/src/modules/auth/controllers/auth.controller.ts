import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { Credentials, GuestCredentials } from '../models/credentials';
import { AuthService } from '../services/auth.service';
import { isNullOrUndefined } from 'util';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDto } from 'src/modules/users/models/userDto';

@Controller()
export class AuthController {


  constructor(
    private readonly _authService: AuthService
  ) {}


  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async authenticate(@Req() req: Request, @Res() res: Response) {

    const token = await this._authService.getToken(req.user as UserDto);

    if (isNullOrUndefined(token)) {
      res.status(401).send();
    }

    res.send(token);
  }


  @Post('authenticate-guest')
  async authenticateGuest(@Body() body: GuestCredentials, @Res() res: Response ) {}

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    req.logOut();
    console.log(req.logout())
  }

}
