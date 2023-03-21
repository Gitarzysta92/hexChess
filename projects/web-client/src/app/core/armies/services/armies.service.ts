import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { IArmyBadge } from '../api';
import { mapArmyToArmyBadge } from '../mappings/army-to-army-badge.mapping';
import { IArmy } from '../models/army';
import { IArmyDto } from '../models/army.dto';
import { ITileGraphicalData } from '../models/tile-graphical-data';
import { TilesService } from './tiles.service';


@Injectable({
  providedIn: 'root'
})
export class ArmiesService {

  constructor(
    private readonly _tileService: TilesService,
    private readonly _httpClient: HttpClient,
    private readonly _configurationService: ConfigurationService
  ) { }

  public getArmies(armyIds?: string[]): Observable<IArmy[]> {
    return this._httpClient.get<IArmyDto[]>(this._configurationService.apiUrl + "/armies")
      .pipe(
        map(as => as.filter(a => armyIds == null ? true : armyIds.includes(a.id))),
        switchMap(as => forkJoin(as.map(a => this._tileService.getTileImageUrls(a.graphicalData).pipe(map(b => Object.assign(a, { imgBindings: b })))))),
        tap(as => this._bindGraphicalDataToArmy(as, as.map(a => a.graphicalData)))
      );
  }


  public getArmyBadges(): Observable<IArmyBadge[]> {
    return this._httpClient.get<IArmyDto[]>(this._configurationService.apiUrl + "/armies")
      .pipe(map(as => as.map(a => mapArmyToArmyBadge(a))));
  }

  public getArmyBadge(armyId): Observable<IArmyBadge> {
    return this.getArmyBadges().pipe(map(a => a.find(a => a.armyId === armyId)));
  }

  private _bindGraphicalDataToArmy(armies: IArmy[], tgs: ITileGraphicalData[]): void {
    armies.forEach(a => {
      a.tiles = a.tiles.map(t => Object.assign(t, {
        colors: a.colors,
        graphicalData: tgs.find(tg => tg.id === t.id)
      }));
  
      a.headquarter = Object.assign(a.headquarter, {
        colors: a.colors,
        graphicalData: tgs.find(tg => tg.id === a.headquarter.id)
      });
    })
  }
}