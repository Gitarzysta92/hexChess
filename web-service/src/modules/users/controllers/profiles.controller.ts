import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfilesController {
  @UseGuards(JwtAuthGuard)
  @Get('owned')
  getProfile(@Req() req) {
    return req.user;
  }
}
