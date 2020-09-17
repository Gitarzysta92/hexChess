import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


const headers = new HttpHeaders();

headers.append('Content-Type', 'x-www-form-urlencoded');



interface SigninCredentials {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User; 
  public token: string;

  constructor(
    private readonly _httpClient: HttpClient,
  ) { 
    this.token = localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public authenticate(credentials: SigninCredentials): Observable<string> {
    return this._httpClient.post('http://localhost:3000/authenticate', credentials, { headers, responseType: "text" })
      .pipe(tap(result => {
        this.token = result
        localStorage.setItem('token', this.token);
      }));
  }

  public unauthenticate() {
    this.token = null;
    localStorage.removeItem('token');
  }


  public refreshToken() {
    return this._httpClient.get('http://localhost:3000/refresh-token', { headers, responseType: "text" })
      .subscribe(result => {
        this.token = result
        localStorage.setItem('token', this.token);
      }, err => {
        this.token = null;
        localStorage.removeItem('token');  
      })

  }
}


class User {
  email: string;
  password: string;
  constructor(userData: SigninCredentials) {
    this.email = userData.email;
    this.password = userData.password;
  }
}
