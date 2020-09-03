import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService, Credentials } from 'src/services/user/user.service';
import { isNullOrUndefined } from 'util';
import { Response } from 'express';

@Controller()
export class UserController {

  constructor(
    private _userService: UserService
  ) {}

  @Post('authenticate')
  async authenticate(@Body() body: Credentials, @Res() response: Response) {

    if (!body.login || !body.password) {
      response.status(400).send({ error: 'Something failed!' });
    }

    const token = await this._userService.authenticate(body);

    if (isNullOrUndefined(token)) {
      response.status(401).send();
    }

    response.send(token)
  }
}
