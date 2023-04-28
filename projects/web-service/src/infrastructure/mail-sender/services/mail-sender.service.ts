import { Inject, Injectable } from "@nestjs/common";
import { Transporter } from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport";
import { CONFIG_OPTIONS, DEFAULT_TRANSPORT } from "../constants/mail-sender.constants";
import { ISmtpMailerConfig } from "../models/smtp-mailer-config";

@Injectable()
export class MailSenderService {

  constructor(
    @Inject(DEFAULT_TRANSPORT) private readonly _transporter: Transporter,
    @Inject(CONFIG_OPTIONS) private readonly _options: ISmtpMailerConfig
  ) { }

  async sendEmail(mailOptions: MailOptions) {
    await this._transporter.verify();
    if (!mailOptions.from) {
      mailOptions.from = this._options?.fromEmail ;
    } 
    await this._transporter.sendMail(mailOptions);
  }

}