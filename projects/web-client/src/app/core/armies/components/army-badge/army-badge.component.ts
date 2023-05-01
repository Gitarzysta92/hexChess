import { Component, Input } from '@angular/core';
import { IHexagonColors } from 'src/app/shared/misc/api';
import { IArmyBadgeConfig } from '../../models/army-badge-config';

@Component({
  selector: 'army-badge',
  template: `
    <hexagon [colors]="colors" [class.loading]="showLoader">
      <i [name]="icon" ></i>
    </hexagon>
    <div *ngIf="showLoader" class="loader-wrapper flex_center-center">
      <div circle-spinner></div>
    </div>
  `,
  styles: [
    `:host {
      display: block;
      position: relative;
    }`,
    `hexagon {
      width: 100%;
      height: 100%;
      transition: opacity ease-in-out .2s;
    }`,
    `hexagon i {
      height: 100%;
      font-size: 0.6em;
    }`,
    `hexagon i::before {
      top: 50%;
      transform: translate(0, -50%);
    }`,
    `hexagon.loading {
      opacity: .5;
    }`,
    `.loader-wrapper {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }`,
  ]
})
export class ArmyBadgeComponent {
  
  @Input() showLoader: boolean = false;

  @Input('setup') set setup(data: IArmyBadgeConfig) {
    this.icon = data?.icon;
    this.colors = data?.colors;
  }

  public colors: IHexagonColors;
  public icon: string;
}
