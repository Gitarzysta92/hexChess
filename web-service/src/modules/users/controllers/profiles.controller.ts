import { Controller, UseGuards, Get, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ProfileDto } from '../models/profileDto';
import { ProfilesService } from '../services/profiles.service';

@Controller('profile')
export class ProfilesController {


  constructor(
    private _profilesService: ProfilesService,
  ) { }

  @Get()
  async updateUser(@Query() query: { [key: string]: string }) {
    const result = await this._profilesService.search(query);
    console.log(result);
    return result;

  } 


  @UseGuards(JwtAuthGuard)
  @Get('owned')
  getProfile(@Req() req) {
    return req.user;
  }
}
