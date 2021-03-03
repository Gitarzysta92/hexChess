import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Army, ArmyColors } from 'src/app/core/models/army';
import { MyProfileService } from 'src/app/core/services/profile-service/profile.service';
import { UtilityService } from 'src/app/core/services/utility-service/utility.service';

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

  @Input() selected: Army[] = [];
  @Input() disabled: Army[] = [];
  
  @Input() selectionLimit: number = Number.MAX_SAFE_INTEGER;

  @Output() select: EventEmitter<ArmySelect[]> = new EventEmitter();
  @Output() remove: EventEmitter<ArmySelect[]> = new EventEmitter();

  public armies: ArmySelect[] = [];
  
  constructor(
    private readonly _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this._utilityService.getArmies()
      .subscribe(armies => {
        this.armies = armies.map(army => new ArmySelect(army));
        this._setSelected(this.selected);
        this._setDisabled(this.disabled);
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this._setSelected(changes.selected.currentValue);
    }
    if (changes.disabled) {
      this._setDisabled(changes.disabled.currentValue);
    }
  }

  public markAsSelected(selectedArmy: ArmySelect): void {
    const army = this.armies.find(a => a.id === selectedArmy.id)
    if (!army) return;

    const armiesToSelect = this.armies.filter(a => a.selected).reverse().slice(0, this.selectionLimit - 1)
    this._setSelected([army, ...armiesToSelect]);
    this.select.emit(this.armies.filter(a => a.selected));
  }

  public removeSelected(): void {
    this.remove.next(this.selected);
  }

  private _setSelected(selectedArmies: Army[]): void {
    this.armies.forEach(army => {
      army.selected = selectedArmies.some(sa => sa?.id === army.id);  
    });
  }

  private _setDisabled(disabledArmies: Army[]): void {
    this.armies.forEach(army => {
      army.disabled = disabledArmies.some(sa => sa?.id === army.id);  
    });
  }
}

class ArmySelect extends Army {
  public selected?: boolean;
  public disabled?: boolean;
  constructor(data: ArmySelect) {
    super(data);
    this.selected = data.selected;
    this.disabled = data.disabled;
  }
}
