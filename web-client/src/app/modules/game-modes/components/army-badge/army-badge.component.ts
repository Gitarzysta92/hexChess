import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { HexagonColors } from 'src/app/shared/components/hexagon/hexagon.component';
import { ArmyColors } from 'src/app/core/models/army';

export interface ArmyBadgeSetup {
  icon: string;
  colors?: ArmyColors
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
        left: -50%;
        right: -50%;
        margin: 0 auto;
        font-size: 0.85em;
        z-index: 4444;
    }`
  ]
})
export class ArmyBadgeComponent implements OnInit {
  
  @Input('setup') set setup(data: ArmyBadgeSetup) {
    this.icon = data.icon;
    const { primary, secondary, tertiary } = data.colors;
    this.colors = {
      outer: primary,
      inner: secondary,
      stroke: tertiary
    }
  }

  public colors: HexagonColors;
  public icon: string;

  constructor(
    
  ) { }

  ngOnInit(): void {
  }

}
