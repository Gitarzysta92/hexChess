import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilesRepositoryService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { }

  getProfiles(profileIds: string[]): Observable<ProfileDto[]> {
    const params = new HttpParams()
      .appendAll({ id: profileIds })
    return this._httpClient.get<ProfileDto[]>(this._configurationService.apiUrl + '/profiles', { params: params })
  }
}
