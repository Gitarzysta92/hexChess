import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';
import { buildGetQuery } from 'src/app/utils/helpers/rest-api.helper';
import { MyAccount } from '../../models/my-account';
import { MyProfile, Profile } from '../../models/profile';

const headers = new HttpHeaders();

headers.append('Content-Type', 'x-www-form-urlencoded');


interface ProfilePropsUniquenessQuery {
  id?: string;
  nickname?: string;
  email?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _endpointPath: string = '/profiles'
  token: string;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) {
    this.token = localStorage.getItem('token');
  }


  public getMyProfile(): Observable<MyProfile> {
    return this._httpClient.get<MyProfile>(this._config.apiUrl + this._endpointPath + `/me`)
      .pipe(map(result => new MyProfile(result)));
  }

  public updateMyProfile(profile: MyProfile): Observable<boolean> {
    return this._httpClient.patch<MyProfile>(this._config.apiUrl + this._endpointPath + `/me`, profile).pipe(map(result => !!result));
  }



  public updateMyAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this._httpClient.put(this._config.apiUrl + this._endpointPath + `/me/avatar`, formData, { responseType: 'text' })
  }


  public searchProfile(queryData: { [key: string]: string }): Observable<Profile> {
    const query = Object.entries(queryData).reduce((acc, data) => {
      const [ key, value ] = data;
      return `${acc.length > 0 ? '&' + acc : acc }${key}=${value}`
    }, "");
    return this._httpClient.get<Profile>(this._config.apiUrl + this._endpointPath + `?${query}`);
  }

  public isProfileExists(queryData: ProfilePropsUniquenessQuery): Observable<boolean> {
    const query = buildGetQuery(queryData);
    return this._httpClient.get<boolean>(this._config.apiUrl + this._endpointPath + `/exists?${query}`);
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

  
  public updateMyAccount(account: any): Observable<any> {
    return this._httpClient.patch(this._config.apiUrl + '/account', account , { headers, responseType: "text" });
  }
}
