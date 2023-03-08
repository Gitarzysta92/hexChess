import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IArmyAssignmentDto } from '../models/army-assignment.dto';

@Injectable({
  providedIn: 'root'
})
export class SelectedArmiesService {

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService,
  ) { }


  public setSelectedArmies(selectedArmies: IArmyAssignmentDto[]): Observable<boolean> {
    return this._httpClient.post<boolean>(this._config.apiUrl + `profiles/me/armies`, selectedArmies);
  }

  public getMyArmies(): Observable<IArmyAssignmentDto[]> {
    return this._httpClient.get<IArmyAssignmentDto[]>(this._config.apiUrl + `profiles/me/armies`);
  }
}
