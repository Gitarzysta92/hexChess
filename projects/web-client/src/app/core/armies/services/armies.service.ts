import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { IArmyBadge } from '../api';
import { borgo, borgoGraphical } from '../constants/borgo';
import { hegemony, hegemonyGraphical } from '../constants/hegemony';
import { mapArmyToArmyBadge } from '../mappings/army-to-army-badge.mapping';
import { IArmy } from '../models/army';
import { ITileGraphicalData } from '../models/tile-graphical-data';
import { TilesService } from './tiles.service';


@Injectable({
  providedIn: 'root'
})
export class ArmiesService {

  constructor(
    private readonly _tileService: TilesService 
  ) { }

  public getArmies(armyIds: string[]): Observable<IArmy[]> {
    return forkJoin({
      data: of([borgo, hegemony]),
      graphicalData: of([...borgoGraphical, ...hegemonyGraphical])
    })
      .pipe(
        switchMap(r => this._tileService.getTileImageUrls(r.graphicalData as unknown as ITileGraphicalData[]).pipe(map(b => Object.assign(r, { imgBindings: b })))),
        tap(r => this._bindGraphicalDataToArmy(r.data, r.graphicalData as unknown as ITileGraphicalData[])),
        map(r => r.data)
      );
  }

  public getArmyBadges(): Observable<IArmyBadge[]> {
    return of([borgo, hegemony].map(a => mapArmyToArmyBadge(a)));
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