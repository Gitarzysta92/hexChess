import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AccountDto } from '../models/account.dto';


@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: AccountDto, done: (err: Error | null, id?: any) => void) {
    done(null, user);
  }

  deserializeUser(
    id: any,
    done: (err: Error | null, payload?: AccountDto) => void,
  ) {
    done(null, id);
  }
}
