import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, takeUntil, tap } from 'rxjs/operators';
import { Army } from 'src/app/core/models/army';
import { MyProfileStore } from 'src/app/core/services/profile.store';
import { UtilityService } from 'src/app/core/services/utility-service/utility.service';

@Component({
  selector: 'my-armies-widget',
  templateUrl: './my-armies-widget.component.html',
  styleUrls: ['./my-armies-widget.component.scss'],

})
export class MyArmiesWidgetComponent implements OnInit, OnDestroy {

  public selectedArmies: Observable<Army[]>;
  public armiesLimit: number;

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _myProfileStore: MyProfileStore,
    private readonly _utilityService: UtilityService
  ) {
    this.armiesLimit = 3;

  }

  ngOnInit(): void {
    this.selectedArmies = this._utilityService.getArmies()
      .pipe(concatMap(val => this._getSelectedArmies(val)));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public updateSelectedArmies(armies: Army[]): void {
    this._myProfileStore.updateSelectedArmies(armies.map(a => a.id));
  }

  private _getSelectedArmies(armies: Army[]): Observable<Army[]> {
    return this._myProfileStore.state
      .pipe(map(profile => profile.selectedArmies))
      .pipe(map(selected => selected.reduce((acc, id) => {
        const army = armies.find(a => a.id === id);
        return army ? [...acc, army] : acc; 
      }, [])))
  }

}
