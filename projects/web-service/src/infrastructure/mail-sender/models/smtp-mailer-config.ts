export interface ISmtpMailerConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  global?: boolean;
  fromEmail?: string;
};