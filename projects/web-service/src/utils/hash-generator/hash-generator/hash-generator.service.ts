import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';

@Injectable()
export class HashGenerator {
  constructor( ) { }

  createMd5(tokenPayload: object, secret: string): string {
    return createHmac('md5', secret).update(JSON.stringify(tokenPayload)).digest('base64url');
  }
}
