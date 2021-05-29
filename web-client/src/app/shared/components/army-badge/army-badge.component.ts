import { Component, Input, OnInit } from '@angular/core';
import { HexagonColors } from 'src/app/shared/components/hexagon/hexagon.component';

export interface ArmyBadgeSetup {
  icon: string;
  colors?: HexagonColors
}

@Component({
  selector: 'army-badge',
  template: `
    <hexagon [colors]="colors">
      <i [name]="icon" ></i>
    </hexagon>
  `,
  styles: [
    `:host { display: flex; }`,
    `hexagon i::before {
        position: absolute;
        top: 0;
        left: -50%;
        right: -50%;
        margin: 0 auto;
        font-size: 0.85em;
        z-index: 4444;
    }`,
    `hexagon i {
      position: initial;
    }`
  ]
})
export class ArmyBadgeComponent implements OnInit {
  
  @Input('setup') set setup(data: ArmyBadgeSetup) {
    this.icon = data.icon;
    this.colors = data.colors;
  }

  public colors: HexagonColors;
  public icon: string;

  constructor( ) { }

  ngOnInit(): void {}

}
