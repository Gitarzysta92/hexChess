import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class TokenGenerator {

  private _secret: string;

  constructor() {}

  public create(payload: object): string {
    return jwt.sign(payload, this._secret);
  };

  public async checkToken(token: string): Promise<string> {
    return new Promise((resolved,rejected) => {

      jwt.verify(token, this._secret, function(err, decoded) {
        if (err) return rejected();
        resolved(decoded);
      });
    });
  };

  public setSecret(secret: string): void {
    this._secret = secret;
  }
}