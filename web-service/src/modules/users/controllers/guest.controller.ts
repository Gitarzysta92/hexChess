import { Controller, Post, Body } from '@nestjs/common';
import { GuestDto } from '../models/guestDto';

@Controller('guest')
export class GuestController {

  
  constructor() {}

  

  @Post('create')
  async createGuest(@Body() body: GuestDto) {
    const user = new GuestDto();

    //await this._usersService.createUser(user);
  }

}