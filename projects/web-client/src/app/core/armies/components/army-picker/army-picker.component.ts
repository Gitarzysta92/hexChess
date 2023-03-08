import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IArmyBadge } from '../../models/army-badge';
import { ArmiesService } from '../../services/armies.service';

interface IArmySelect extends IArmyBadge {
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'army-picker',
  templateUrl: './army-picker.component.html',
  styleUrls: ['./army-picker.component.scss'],
  animations: [
    trigger('slideIns', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: '0', transform: 'translate(0, -30px)' }),
          stagger(`100ms`, [
            animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ArmyPickerComponent implements OnInit, OnChanges {

  @Input() selected: IArmyBadge[] = [];
  @Input() disabled: IArmyBadge[] = [];
  
  @Input() selectionLimit: number = Number.MAX_SAFE_INTEGER;

  @Output() select: EventEmitter<IArmySelect[]> = new EventEmitter();
  @Output() remove: EventEmitter<IArmySelect[]> = new EventEmitter();

  public armies: IArmySelect[] = [];
  
  constructor(
    private readonly _armiesService: ArmiesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.armies = await firstValueFrom(this._armiesService.getArmyBadges());
    this._setSelected(this.selected);
    this._setDisabled(this.disabled);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this._setSelected(changes.selected.currentValue);
    }
    if (changes.disabled) {
      this._setDisabled(changes.disabled.currentValue);
    }
  }

  public markAsSelected(selectedArmy: IArmySelect): void {
    const army = this.armies.find(a => a.armyId === selectedArmy.armyId)
    if (!army) return;

    const armiesToSelect = this.armies.filter(a => a.selected).reverse().slice(0, this.selectionLimit - 1)
    this._setSelected([army, ...armiesToSelect]);
    this.select.emit(this.armies.filter(a => a.selected));
  }

  public removeSelected(): void {
    this.remove.next(this.selected);
  }

  private _setSelected(selectedArmies: IArmyBadge[]): void {
    this.armies.forEach(army => {
      army.selected = (selectedArmies || []).some(sa => sa?.armyId === army.armyId);  
    });
  }

  private _setDisabled(disabledArmies: IArmyBadge[]): void {
    this.armies.forEach(army => {
      army.disabled = (disabledArmies || []).some(sa => sa?.armyId === army.armyId);  
    });
  }
}