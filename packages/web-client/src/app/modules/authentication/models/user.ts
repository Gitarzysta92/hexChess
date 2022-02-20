

export interface SigninCredentials {
  email: string;
  password: string;
}

export class User {
  nickname: string;
  email: string;
  password: string;
  constructor(userData: SigninCredentials & { nickname: string }) {
    this.nickname = userData.nickname
    this.email = userData.email;
    this.password = userData.password;
  }
}
