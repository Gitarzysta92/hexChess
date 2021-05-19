import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinct, map, tap } from 'rxjs/operators';
import { SigninCredentials, User } from '../../models/user';
import { ConfigurationService } from '../configuration/configuration.service';
import { MyAccount } from '../../models/my-account';
import { buildGetQuery } from 'src/app/utils/helpers/rest-api.helper';


const headers = new HttpHeaders();

headers.append('Content-Type', 'x-www-form-urlencoded');


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User; 
  public token: string;

  private _settled: BehaviorSubject<boolean>;


  public set settled(value) {
    this._settled.next(value);
  }

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
    //private readonly _localDb: LocalDbService
  ) { 
    this.token = localStorage.getItem('token');

    this._settled = new BehaviorSubject(false);
  }

  public asd() {
    return this._settled.pipe(distinct());
  }


  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public authenticate(credentials: SigninCredentials): Observable<string> {
    return this._httpClient.post(this._config.apiUrl + '/authenticate', credentials, { headers, responseType: "text" })
      .pipe(tap(result => {
        this.token = result
        localStorage.setItem('token', this.token);
      }));
  }

  public unauthenticate() {
    this.token = null;
    localStorage.removeItem('token');

  }

  public authenticateGuest(nickname: string): Observable<string> {
    return this._httpClient.post(this._config.apiUrl + '/authenticate-guest', { nickname }, { headers, responseType: "text" })
      .pipe(tap(result => {
        this.token = result
        localStorage.setItem('token', this.token);
      }));
  }


  public refreshToken() {
    return this._httpClient.get(this._config.apiUrl + '/refresh-token', { headers, responseType: "text" })
      .subscribe(result => {
        this.token = result
        localStorage.setItem('token', this.token);
      }, err => {
        this.token = null;
        localStorage.removeItem('token');  
      })
  }

  public register(userData: User) {
    return this._httpClient.post(this._config.apiUrl + '/user', userData , { headers, responseType: "text" })
  }

  public updateMyAccount(account: any): Observable<any> {
    return this._httpClient.patch(this._config.apiUrl + '/account', account , { headers, responseType: "text" });
  }

  public getMyAccount(): Observable<MyAccount> {
    // if (this._localDb.isStored('MyAccount')) {
    //   return this._localDb.get<MyAccount>('MyAccount'); 
    // }
    return this._httpClient.get<MyAccount>(this._config.apiUrl + '/account')
      .pipe(map(ma => new MyAccount(ma)))
      // .pipe(tap(ma => {
      //   this._localDb.store('MyAccount', ma);
      // }));
  }

  public isAccountExists(queryData: any): Observable<boolean> {
    const query = buildGetQuery(queryData);
    return this._httpClient.get<boolean>(this._config.apiUrl + `/user/exists?${query}` )
  }
}