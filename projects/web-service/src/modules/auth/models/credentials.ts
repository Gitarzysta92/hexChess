export class Credentials {
  username: string;
  password: string;

  constructor(data: Partial<Credentials>) {
    this.username = data?.username;
    this.password = data?.password
  }
}

export class GuestCredentials {
  username: string;
  ip: string;
}

export interface ILocalUser {
  id: number;
  email: string;
}
