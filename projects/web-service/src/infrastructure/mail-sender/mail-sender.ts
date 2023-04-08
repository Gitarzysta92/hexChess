import { Inject, Injectable, OnModuleInit, Optional } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport";
import { CONFIG_OPTIONS, DEFAULT_MAIL, DEFAULT_TRANSPORT, SENDER_STORAGE } from "./mail-sender.constants";
import { MailSenderOptions } from "./mail-sender.interfaces";






@Injectable()
export class MailSender implements OnModuleInit {
  private _transporter: Transporter;

  constructor(
    @Inject(DEFAULT_TRANSPORT) private readonly _transporterName: string,
    @Inject(SENDER_STORAGE) private readonly _storage: any,
    @Optional() @Inject(DEFAULT_MAIL) private _defaultMail: string,
    @Optional() @Inject(CONFIG_OPTIONS) private readonly _options: MailSenderOptions 
  ) { }

  onModuleInit() {
    this._transporter = this._storage[this._transporterName];

    if (!this._transporter && !this._options)
      throw new Error('No available transporter for MailSender');
    
    if (!this._transporter) {
      const options = this._options;
      this._transporter = createTransport({
        host: options?.host,
        port: options?.port,
        secure: true, // upgrade later with STARTTLS
        debug: true,
        logger: true,
        authMethod: 'LOGIN',
        auth: {
          type: 'LOGIN',
          user: options?.username,
          pass: options?.password
        }
      });
      this._defaultMail = options?.defaultMail || options?.username
    }
  }


  async sendEmail(mailOptions: MailOptions) {
    await this._transporter.verify();
    if (!mailOptions.from) {
      mailOptions.from = this._defaultMail;
    } 
    await this._transporter.sendMail(mailOptions);
  }

}