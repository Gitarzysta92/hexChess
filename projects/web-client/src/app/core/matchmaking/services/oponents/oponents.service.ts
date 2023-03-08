import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IOponentProfileDto } from '../../models/oponent-profile.dto';

@Injectable({
  providedIn: 'root'
})
export class OponentsService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { }

  getOponentsProfiles(profilesIds: string[]): Observable<IOponentProfileDto[]> {
    let params = new HttpParams();
    params = profilesIds.reduce((params, id) => params.append('playerId', id), params);
    return this._httpClient.get<IOponentProfileDto[]>(this._configurationService.apiUrl + `/rooms/players`, { params: params })
  }
}
