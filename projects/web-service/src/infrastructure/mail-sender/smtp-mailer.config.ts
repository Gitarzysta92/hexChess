import { registerAs } from "@nestjs/config";

export interface SmtpMailerConfig {
  host: string,
  port: number,
  username: string,
  password: string
};


export const SMTP_MAILER_CONFIG = 'smtp-mailer-config';
export const smtpMailerConfig = registerAs(SMTP_MAILER_CONFIG, () => {
  const config: SmtpMailerConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD
  }
  return config;
});
