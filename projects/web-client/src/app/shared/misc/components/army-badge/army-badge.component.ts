import { Component, Input } from '@angular/core';
import { HexagonColors } from '../hexagon/hexagon.component';


export interface ArmyBadgeConfig {
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
    `:host {
      display: block;
    }`,
    `hexagon {
      width: 100%;
      height:100%;
    }`,
    `hexagon i {
      height: 100%;
      font-size: 0.6em;
    }`,
    `hexagon i::before {
      top: 50%;
      transform: translate(0, -50%);
    }`,
  ]
})
export class ArmyBadgeComponent{
  
  @Input('setup') set setup(data: ArmyBadgeConfig) {
    this.icon = data?.icon;
    this.colors = data?.colors;
  }

  public colors: HexagonColors;
  public icon: string;
}
