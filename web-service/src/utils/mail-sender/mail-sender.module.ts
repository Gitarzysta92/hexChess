import { DynamicModule, Global, Inject, Module, Optional } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { createTransport } from 'nodemailer';
import { MailSender } from './mail-sender';
import { CONFIG_OPTIONS, DEFAULT_TRANSPORT, SENDER_STORAGE } from './mail-sender.constants';


export interface SmtpMailerConfig {
  host: string
  port: number
  username: string
  password: string
  global?: boolean
};

export interface SmtpMailerAsyncConfig {
  imports: any
  useFactory: any
  inject: any
  global?: boolean
}

const storage: { [key: string]: any } = {};


@Module({})
export class MailSenderModule {

  static rootConfig: SmtpMailerAsyncConfig



  constructor(
    @Optional() @Inject(CONFIG_OPTIONS) private readonly _options: SmtpMailerConfig,
  ) {
    if (this._options)
      this._createTransport(this._options, DEFAULT_TRANSPORT);
  }



  static forRoot(options: SmtpMailerConfig): DynamicModule {
    return {
      module: MailSenderModule,
      providers: [
        {
          provide: DEFAULT_TRANSPORT,
          useValue: storage[DEFAULT_TRANSPORT]
        },
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailSender,
      ],
      exports: [MailSender],
      global: options.global
    };
  }

  static forRootAsync(options: SmtpMailerAsyncConfig): DynamicModule {

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
          useValue: DEFAULT_TRANSPORT
        },
        {
          provide: SENDER_STORAGE,
          useValue: storage
        },
        MailSender,
      ],
      exports: [MailSender],
      global: options.global
    };
  }

  static forFeature(): DynamicModule {
    return {
        module: MailSenderModule,
        imports: [],
        providers: [
          {
            provide: DEFAULT_TRANSPORT,
            useValue: DEFAULT_TRANSPORT
          },
          {
            provide: SENDER_STORAGE,
            useValue: storage
          },
          MailSender
        ],
        exports: [
          MailSender
        ]
      }
    }

  private _createTransport(options: SmtpMailerConfig, transportKey: string): void {

    if (storage[transportKey]) return;

    const transport = createTransport({
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

    Object.defineProperty(storage, transportKey, {
      value: transport,
      enumerable: true,
    });
  }
  
}