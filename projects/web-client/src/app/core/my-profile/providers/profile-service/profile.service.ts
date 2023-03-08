import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { buildGetQuery } from 'src/app/utils/helpers/rest-api.helper';
import { IMyAccountDto } from '../../models/my-account.dto';
import { IMyProfileDto } from '../../models/my-profile.dto';


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


  public getMyProfile(): Observable<IMyProfileDto> {
    return this._httpClient.get<IMyProfileDto>(this._config.apiUrl + this._endpointPath + `/me`);
  }

  public updateMyProfile(profile: IMyProfileDto): Observable<boolean> {
    return this._httpClient.patch<IMyProfileDto>(this._config.apiUrl + this._endpointPath + `/me`, profile).pipe(map(result => !!result));
  }



  public updateMyAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this._httpClient.put(this._config.apiUrl + this._endpointPath + `/me/avatar`, formData, { responseType: 'text' })
  }


  public searchProfile(queryData: { [key: string]: string }): Observable<IMyProfileDto> {
    const query = Object.entries(queryData).reduce((acc, data) => {
      const [ key, value ] = data;
      return `${acc.length > 0 ? '&' + acc : acc }${key}=${value}`
    }, "");
    return this._httpClient.get<IMyProfileDto>(this._config.apiUrl + this._endpointPath + `?${query}`);
  }

  public isProfileExists(queryData: { id?: string; nickname?: string; email?: string}): Observable<boolean> {
    const query = buildGetQuery(queryData);
    return this._httpClient.get<boolean>(this._config.apiUrl + this._endpointPath + `/exists?${query}`);
  }

  public getMyAccount(): Observable<IMyAccountDto> {
    return this._httpClient.get<IMyAccountDto>(this._config.apiUrl + '/account')
  }

  public refreshToken() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'x-www-form-urlencoded');
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
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'x-www-form-urlencoded');
    return this._httpClient.patch(this._config.apiUrl + '/account', account , { headers, responseType: "text" });
  }

  public getMyAvatarUrl(fileName: string): Observable<string> {
    return this._httpClient.get(this._config.avatarsBlobStorageUrl + fileName, { responseType: 'blob'})
      .pipe(map(r => URL.createObjectURL(r)))
  }
}
