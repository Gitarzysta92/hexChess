import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/core';
import { OponentProfile } from '../../models/oponent-profile';

@Injectable({
  providedIn: 'root'
})
export class OponentsService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { }

  getOponentsProfiles(profilesIds: string[]): Observable<OponentProfile[]> {
    let params = new HttpParams();
    params = profilesIds.reduce((params, id) => params.append('playerId', id), params);
    return this._httpClient.get<OponentProfile[]>(this._configurationService.apiUrl + `/rooms/players`, { params: params })
  }
}
