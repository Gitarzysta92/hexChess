export class Credentials {
  email: string;
  password: string;
}

export class GuestCredentials {
  username: string;
  ip: string;
}

export interface ILocalUser {
  id: number;
  email: string;
}
