import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/infrastructure/configuration/api';
import { PanelOverlayComponent } from 'src/app/shared/dialogs/components/panel-overlay/panel-overlay.component';
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
    private readonly _configurationService: ConfigurationService,
    private readonly _armiesService: ArmiesService
  ) {
    this.armiesLimit = this._configurationService.selectedArmiesLimit + 1;

    this.addArmySlotButtonSetup = {
      outer: "#707070",
      inner: "#242424",
      stroke: "#2b2b2b"
    };
  }

  ngOnInit(): void {
    this.selectedArmies = this._armiesService.getArmyBadges()
      .pipe(
        switchMap(badges => this._selectedArmiesStore.state
          .pipe(map(selected => this._getSelectedArmiesBadges(selected, badges)))
        ));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public setSelectedArmy(
    armyBadge: IArmyBadge & { isProcessing: boolean },
    currentlySelected: IArmyAssignmentDto & { isProcessing: boolean }
  ): void {
    if (currentlySelected) {
      currentlySelected.isProcessing = true;
    } else {
      armyBadge.isProcessing = true;
    }
    this._selectedArmiesStore.setSelectedArmy({
      armyId: armyBadge.armyId,
      priority: currentlySelected?.priority
    })
      .subscribe({
        error: () => {
          if (currentlySelected) {
            currentlySelected.isProcessing = false;
          } else {
            armyBadge.isProcessing = false;
          }
        }
      });
  }

  public removeSelectedArmy(currentlySelected: IArmyAssignmentDto & { isProcessing: boolean }): void {
    currentlySelected.isProcessing = true;
    this._selectedArmiesStore.removeSelectedArmy({
      armyId: currentlySelected.armyId,
      priority: currentlySelected.priority
    })
      .subscribe({
        complete: () => currentlySelected.isProcessing = false,
        error: () => currentlySelected.isProcessing = false
      })
  }

  private _getSelectedArmiesBadges(selected: IArmyAssignmentDto[], badges: IArmyBadge[]): IArmyBadge[] {
    return selected.reduce((acc, s) => {
      const badge = badges.find(a => a.armyId === s.armyId);
      (badge as any).isProcessing = false;
      Object.assign(badge, s);
      if (!badge) {
        throw new Error(`Cannot found badge for armyid: ${s.armyId}`);
      }
      return [...acc, badge];
    }, []);
  }
}
