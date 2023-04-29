import { Injectable } from "@nestjs/common";

@Injectable()
export class MailTemplateService {

  constructor(
    
  ) { }

  public generatePasswordResetMailBody(token: string): string {
    return `${process.env.WEBCLIENT_HOST}/account/recovery/${token}`
  }

}