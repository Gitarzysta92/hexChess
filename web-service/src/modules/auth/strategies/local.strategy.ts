import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    });
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.authenticate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
