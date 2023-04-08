import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/core/identity/services/accounts.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailSender } from 'src/infrastructure/mail-sender/mail-sender';

@Injectable()
export class PasswordResetService {
  
  constructor(
    private readonly _accountService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly _mailSender: MailSender
  ) {}

  public async sendResetEmail(email: string): Promise<void> {
    const user = await this._accountService.getAccountByEmail(email);
    if (!user) return;

    const saltRounds = 10;
    const checksum = await bcrypt.hash(user.password + user.email, saltRounds);
    const date = new Date()
    const token = this.jwtService.sign({ 
      checksum,
      username: user.email
    }, {
      algorithm: "HS256",
      expiresIn: date.setDate(date.getDate() + 1)
    });

  
    var mailOptions = {
      to: email,
      subject: 'Hex - password reset',
      text: token
    };

    this._mailSender.sendEmail(mailOptions);
  }

  public async getPasswordResetPrincipal(token: string, username: string) {
    const isVerified = this.jwtService.verifyAsync(token);
    if (!isVerified) return;
    const result = this.jwtService.decode(token) as any;

    if (result.username != username) return;

    const user = await this._accountService.getAccountByEmail(result.username);
    const isValid = await bcrypt.compare(user.password + user.email, result.checksum)

    if (!isValid) return;

    return user.id;
  }

  
}
