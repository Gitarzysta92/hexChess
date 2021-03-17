import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { distinct, map, pairwise } from 'rxjs/operators';
import { ICONS, IconsToken } from 'src/app/constants/icons';
import { Army } from 'src/app/core/models/army';
import { HexagonColors } from 'src/app/shared/components/hexagon/hexagon.component';
import { PanelOverlayComponent } from 'src/app/shared/components/panel-overlay/panel-overlay.component';
import { StateContainer } from 'utils';

@Component({
  selector: 'armies-select',
  templateUrl: './armies-select.component.html',
  styleUrls: ['./armies-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ArmiesSelectComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('panel', { static: true }) panel: PanelOverlayComponent;

  @Input() state: Army[];
  @Input() initial: number[];
  @Input() armiesLimit: number;
  @Output() selected: EventEmitter<Army[]> = new EventEmitter();


  public get armies() { return this._state.value }
  public isOpen: boolean;
  public addArmySlotButtonSetup: HexagonColors

  private _state: StateContainer<Army[]>;

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    @Inject(IconsToken) public readonly icon: typeof ICONS,
  ) { 
    this.isOpen = false;

    this.addArmySlotButtonSetup = {
      outer: "#707070",
      inner: "#242424",
      stroke: "#2b2b2b"
    }

    this._state = new StateContainer([]);

    this._state.changed
      .pipe(distinct(), pairwise())
      .pipe(map(value => {
        const oldArmies = value[0] || [];
        const newArmies = value[1] || [];
        return {
          selected: newArmies.find(na => !oldArmies.some(oa => this._compareArmy(na, oa))),
          armies: newArmies
        }
      }))
      .subscribe(state => {
        const currentlyEditedArmy = state.selected
        this._setPanelContext(currentlyEditedArmy);

        const selectedArmies = state.armies;
        if (selectedArmies.length === this.armiesLimit || selectedArmies.length === 0) {
          this.panel.hidePanel();
        } 
        
        this.selected.next(this._state.value);     
      });
      this._state.set([]);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.state && changes.state.isFirstChange()) {
      this._state.set(this.state);
    }  
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public setPlayerSelectedArmy(armies: Army[], armyToReplace: Army): void {
    let selectedArmies: Army[] = [];

    if (!armyToReplace) {
      selectedArmies = this.armies.concat(armies);
    } else {
      selectedArmies = this.armies.reduce((acc, army) => {
        if (!this._compareArmy(army, armyToReplace)) return [...acc, army];
        const selectedArmy = armies[0];
        return selectedArmy ? [...acc, selectedArmy] : acc;
      }, []);
    }


    this._state.set(selectedArmies);
  }

  public removeSelectedArmy(toRemove: Army): void {
    this._state.set(this.armies.filter(army => army.id !== toRemove.id));
  }

  private _setPanelContext(army: Army): void {
    if (!this.panel.isOpen) return;
    this.panel.context = army;
  }

  private _compareArmy(first: Army, second: Army): boolean {
    return first.id === second.id;
  }

}

