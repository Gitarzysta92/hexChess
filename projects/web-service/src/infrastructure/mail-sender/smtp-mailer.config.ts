import { registerAs } from "@nestjs/config";
import { ISmtpMailerConfig } from "./models/smtp-mailer-config";

export const SMTP_MAILER_CONFIG = 'smtp-mailer-config';
export const smtpMailerConfig = registerAs(SMTP_MAILER_CONFIG, () => {
  const config: ISmtpMailerConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    fromEmail: process.env.FROM_EMAIL
  }
  return config;
});
