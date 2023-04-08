import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/core/identity/services/accounts.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountDto } from '../models/account.dto';
import { OAuthResponseDto } from '../models/oauth-response.dto';

@Injectable()
export class AuthenticationService {
  
  constructor(
    private readonly _accountService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  public async authenticate(username: string, password: string): Promise<AccountDto | null> {
    const account = await this._accountService.getAccountByEmail(username);
    if (account && (await bcrypt.compare(password, account.password))) {
      delete account.password
      return account;
    }
    return null;
  }

  public async getToken(accountId: string, payload: any): Promise<OAuthResponseDto | undefined> {
    const account = await this._accountService.getAccountById(accountId);
    const token = this.jwtService.sign(Object.assign({ username: account.email, id: account.id }, payload));
    if (!token) {
      return;
    }
    return {
      "access_token": token,
      "token_type": "Bearer"
    }
  }

}
