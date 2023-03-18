import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { PanelOverlayComponent } from 'src/app/shared/dialogs/components/panel-overlay/panel-overlay.component';
import { mapArmyBadgeToArmyBaseData } from '../../mappings/army-badge-to-army-base-data.mapping';
import { IArmyAssignmentDto } from '../../models/army-assignment.dto';
import { IArmyBadge } from '../../models/army-badge';
import { ArmiesService } from '../../services/armies.service';
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

  public selectedArmies: Observable<IArmyBadge[]>;
  public armiesLimit: number;

  private _onDestroy: Subject<void> = new Subject();
  addArmySlotButtonSetup: { outer: string; inner: string; stroke: string; };

  constructor(
    private readonly _selectedArmiesStore: SelectedArmiesStore,
    private readonly _armiesService: ArmiesService,
    private readonly _configurationService: ConfigurationService
  ) {
    this.armiesLimit = this._configurationService.selectedArmiesLimit + 1;

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

  public setSelectedArmy(armyBadge: IArmyBadge, oldArmy: IArmyAssignmentDto): void {
    this._selectedArmiesStore.setSelectedArmy({
      army: mapArmyBadgeToArmyBaseData(armyBadge),
      priority: oldArmy.priority,
      profileId: oldArmy.profileId
    });
  }

  public removeSelectedArmy(armyBadge: IArmyBadge): void {
    this._selectedArmiesStore.remove({
      army: mapArmyBadgeToArmyBaseData(armyBadge)
    })
  }

  private _getSelectedArmiesBadges(selected: IArmyAssignmentDto[]): Observable<IArmyBadge[]> {
    return this._armiesService.getArmyBadges()
      .pipe(map(badges => selected.reduce((acc, s) => {
        const army = badges.find(a => a.armyId === s.army.id);
        
        if (!army)
          throw new Error(`Cannot found badge for armyid: ${s.army.id}`)

        return [...acc, army]; 
      }, [])))
  }

}
