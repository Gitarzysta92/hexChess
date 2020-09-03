import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


const headers = new HttpHeaders();

headers.append('Content-Type', 'x-www-form-urlencoded');



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

  constructor(
    private readonly _httpClient: HttpClient
  ) { 
    this._user = new User({
      login: 'test',
      password: 'test'
    });


    const token = localStorage.getItem('token');
    this.auth = !!token;
  }

  public isAuthenticated(): boolean {
    return this.auth;
  }

  public authenticate(credentials: SigninCredentials): Observable<string> {
    //const result = this._user.login === credentials.login && this._user.password === credentials.password;
    // this.auth = result;
    // return new Observable(subscriber => {
    //   subscriber.next(result);
    //   subscriber.complete();
    // })

    return this._httpClient.post('http://localhost:3000/authenticate', credentials, { headers, responseType: "text" })
      .pipe(tap(result => {
        this.auth = !!result;

        localStorage.setItem('token', 'token');
      }));
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
