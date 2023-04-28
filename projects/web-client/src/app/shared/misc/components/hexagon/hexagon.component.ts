import { Component, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

export interface HexagonColors {
  stroke: string;
  outer: string;
  inner: string;
}


const defaultColors: HexagonColors = {
  stroke: '#131217', 
  outer: '#6d3495',
  inner: '#1d0536'
}


@Component({
  selector: 'hexagon',
  template: `
    <svg height="100%" width="100%" viewBox="0 0 300 300" class="outer">
      <polygon points="300,150 225,280 75,280 0,150 75,20 225,20" [attr.fill]="this.colors.outer"></polygon>
    </svg>
    <svg height="80%" width="80%" viewBox="0 0 300 300" class="inner">
      <polygon points="300,150 225,280 75,280 0,150 75,20 225,20" [attr.fill]="this.colors.inner"></polygon>
    </svg>
    <div class="content-wrapper flex_center-center" [style.color]="this.colors.outer">
      <ng-content></ng-content>
    </div>
    `,
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent {

  @Input() colors: HexagonColors = defaultColors;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef
  ) { }
}