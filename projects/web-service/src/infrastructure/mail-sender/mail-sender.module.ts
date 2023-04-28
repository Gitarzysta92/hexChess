import { DynamicModule, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailSenderService } from './services/mail-sender.service';
import { CONFIG_OPTIONS, DEFAULT_TRANSPORT } from './constants/mail-sender.constants';
import { ISmtpMailerConfig } from './models/smtp-mailer-config';
import { ISmtpMailerAsyncConfig } from './models/smtp-mailer-async-config';
import { Transporter } from "nodemailer"
import { MailTemplateService } from './services/mail-template.service';

@Module({})
export class MailSenderModule {

  static transporter: Transporter;
  static defaultOptions: ISmtpMailerConfig;

  constructor() { }


  public static forFeatureAsync(options: ISmtpMailerAsyncConfig): DynamicModule {
  
    return {
      module: MailSenderModule,
      imports: options.imports,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: DEFAULT_TRANSPORT,
          useFactory: options => this._createTransport(options),
          inject: [CONFIG_OPTIONS]
        },
        MailSenderService,
        MailTemplateService
      ],
      exports: [
        MailSenderService,
        MailTemplateService
      ],
      global: options.global
    };
  }


  static _createTransport(options: ISmtpMailerConfig): Transporter {
    if (!!this.transporter) {
      return this.transporter;
    }

    return this.transporter = createTransport({
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
  }
  
}