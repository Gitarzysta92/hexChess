import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/core';
import { PanelOverlayComponent } from 'src/app/shared/components/panel-overlay/panel-overlay.component';
import { ArmyBadge, MySelectedArmy } from '../../models/army';

import { ArmiesService } from '../../services/armies/armies.service';
import { SelectedArmiesStore } from '../../stores/selected-armies.store';


@Component({
  selector: 'my-armies-widget',
  templateUrl: './my-armies-widget.component.html',
  styleUrls: ['./my-armies-widget.component.scss'],
  animations: [
    trigger('slideIns', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block' }),
        animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' }))
      ]),
      transition(':leave', [
        style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' }),
        animate('200ms ease-in-out', style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block' }))
      ]),
    ]),
  ]
})
export class MyArmiesWidgetComponent implements OnInit, OnDestroy {

  @ViewChild('panel', { static: true }) panel: PanelOverlayComponent;

  public selectedArmies: Observable<ArmyBadge[]>;
  public armiesLimit: number;

  private _onDestroy: Subject<void> = new Subject();
  addArmySlotButtonSetup: { outer: string; inner: string; stroke: string; };

  constructor(
    private readonly _selectedArmiesStore: SelectedArmiesStore,
    private readonly _armiesService: ArmiesService,
    private readonly _configurationService: ConfigurationService
  ) {
    this.armiesLimit = this._configurationService.selectedArmyFallbacksLimit + 1;

    this.addArmySlotButtonSetup = {
      outer: "#707070",
      inner: "#242424",
      stroke: "#2b2b2b"
    }
  }

  ngOnInit(): void {
    this.selectedArmies = this._selectedArmiesStore.state
      .pipe(switchMap(selectedArmies => this._getSelectedArmiesBadges(selectedArmies)))
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public setSelectedArmy(armyBadge: ArmyBadge, oldArmy: MySelectedArmy): void {
    const s = MySelectedArmy.fromArmyBadge(armyBadge, oldArmy?.priority);
    this._selectedArmiesStore.setSelectedArmy(s);
  }

  public removeSelectedArmy(armyBadge: ArmyBadge): void {
    this._selectedArmiesStore.remove(MySelectedArmy.fromArmyBadge(armyBadge))
  }

  private _getSelectedArmiesBadges(selected: MySelectedArmy[]): Observable<ArmyBadge[]> {
    return this._armiesService.getArmiesBadges()
      .pipe(map(badges => selected.reduce((acc, s) => {
        const army = badges.find(a => a.id === s.armyId);
        
        if (!army)
          throw new Error(`Cannot found badge for armyid: ${s.armyId}`)

        return [...acc, army]; 
      }, [])))
  }

}
