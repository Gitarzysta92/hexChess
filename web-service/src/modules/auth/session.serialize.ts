import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDto } from '../users/models/userDto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserDto, done: (err: Error | null, id?: any) => void) {
    done(null, user);
  }

  deserializeUser(
    id: any,
    done: (err: Error | null, payload?: UserDto) => void,
  ) {
    done(null, id);
  }
}
