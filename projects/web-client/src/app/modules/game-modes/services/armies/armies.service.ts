import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';
import { ArmyBadge, AssignedArmy, MySelectedArmy } from '../../models/army';

export const armies = [
  {
    id: 1,
    name: 'borgo',
    colors: {
      outer: '#30c2ff',
      inner: '#1a406b',
      stroke: '#0578fa'
    },
    icon: 'borgo'
  },
  {
    id: 2,
    name: 'hegemony',
    colors: {
      outer: '#edb316',
      inner: '#ab4a03',
      stroke: '#ff7404'
    },
    icon: 'hegemony'
  },
  {
    id: 3,
    name: 'random',
    colors: {
      outer: "#bababa",
      inner: "#3d3d3d",
      stroke: "#767676"
    },
    icon: 'random'
  }
];


@Injectable({
  providedIn: 'root'
})
export class ArmiesService {
  private _endpointPath: string = '/profiles'

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _config: ConfigurationService
  ) { }

  public setSelectedArmies(selectedArmies: MySelectedArmy[]): Observable<boolean> {
    return this._httpClient.post<boolean>(this._config.apiUrl + this._endpointPath + `/me/armies`, selectedArmies)
  }

  public getArmiesBadges(): Observable<ArmyBadge[]> {
    return of(armies);
  }

  public getArmyBadge(armyId): Observable<ArmyBadge> {
    return of(armies.find(a => a.id === armyId));
  }

  public getMyArmies(): Observable<MySelectedArmy[]> {
    return this._httpClient.get<MySelectedArmy[]>(this._config.apiUrl + this._endpointPath + `/me/armies`)
      .pipe(map(armies => armies.map(a => new MySelectedArmy(a))));
  }
}
