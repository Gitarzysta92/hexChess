import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailSender } from 'src/utils/mail-sender/mail-sender';
import { ProfilesService } from 'src/modules/users/services/profiles.service';

@Injectable()
export class AuthService {
 
  
  constructor(
    private readonly _usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly _mailSender: MailSender,
    private readonly _profileService: ProfilesService
  ) {}

  public async authenticate(username: string, pass: string): Promise<any> {
    const user = await this._usersService.getUser(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async getToken(userId: number): Promise<string> {
    const user = await this._usersService.getUserById(userId);
    const profile = await this._profileService.getProfile(userId);
    return this.jwtService.sign({ username: user.email, id: user.id, profileId: profile.id });
  }


  public async sendResetEmail(email: string): Promise<void> {
    const user = await this._usersService.getUser(email);
    if (!user) return;

    const saltRounds = 10;
    const checksum = await bcrypt.hash(user.password + user.email, saltRounds);

    //this._dateTime.current().add(12, 'hours'),

    const date = new Date()

    const token = this.jwtService.sign({ 
      checksum,
      username: user.email
    }, {
      algorithm: "HS256",
      expiresIn: date.setDate(date.getDate() + 1),
      //encoding: 
      //keyid?: 
      // notBefore?: 
      // audience?: 
      // subject?: 
      // issuer?: 
      // jwtid?: 
      // mutatePayload?: 
      // noTimestamp?: 
      // header?: 
    });

    

    var mailOptions = {
      to: email,
      subject: 'Hex - password reset',
      text: token
    };


    this._mailSender.sendEmail(mailOptions);
  }

  async getPasswordResetPrincipal(token: string, username: string) {
    const isVerified = this.jwtService.verifyAsync(token);
    if (!isVerified) return;
    const result = this.jwtService.decode(token) as any;

    if (result.username != username) return;

    const user = await this._usersService.getUser(result.username);
    const isValid = await bcrypt.compare(user.password + user.email, result.checksum)

    if (!isValid) return;

    return user.id;
  }

  
}
