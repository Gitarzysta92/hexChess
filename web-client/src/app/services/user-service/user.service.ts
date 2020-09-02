import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface SigninCredentials {
  login: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User; 

  auth: boolean =false;

  constructor() { 
    this._user = new User({
      login: 'test',
      password: 'test'
    })
  }

  public isAuthenticated(): boolean {
    return this.auth;
  }

  public authenticate(credentials: SigninCredentials): Observable<boolean> {
    const result = this._user.login === credentials.login && this._user.password === credentials.password;

    this.auth = result;

    return new Observable(subscriber => {
      subscriber.next(result);
      subscriber.complete();
    })
  }
}


class User {
  login: string;
  password: string;
  constructor(userData: SigninCredentials) {
    this.login = userData.login;
    this.password = userData.password;
  }
}
