import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthTokenPayload } from '../../models/auth-token-payload.dto';
import { ContextUserData } from 'src/shared/extensions/api';
import { ConfigService } from '@nestjs/config';
import { JWT_AUTH_TOKEN_CONFIG } from '../../configs/jwt-auth-token.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly _configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get(JWT_AUTH_TOKEN_CONFIG)?.secret,
      session: false
    });
  }

  async validate(payload: AuthTokenPayload): Promise<ContextUserData> {
    return { id: payload.id, email: payload.username, profileId: payload.profileId };
  }
}
