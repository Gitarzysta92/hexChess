import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

type email = string;

interface AuthToken {
  username: email, 
  id: number;
  exp: number;
  iat: number;
}


const jwtConstants = {
  secret: 'secretKey',
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      session: false
    });
  }

  async validate(payload: AuthToken) {
    return { id: payload.id, email: payload.username };
  }
}
