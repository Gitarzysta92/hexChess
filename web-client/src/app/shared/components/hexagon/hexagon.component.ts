import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

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
      <div class="outer red">
        <div class="inner-wrapper">
          <div class="inner">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
      <div class="stroke-wrapper">
        <div class="stroke"></div>
      </div>
    `,
  styleUrls: ['./hexagon.component.scss']
})
export class HexagonComponent implements OnInit, AfterViewInit {

  @HostBinding('class.red') aasd = true;

  @Input() colors: HexagonColors = defaultColors;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    const stroke = this._elementRef.nativeElement.querySelector('.stroke-wrapper');
    this._renderer.setStyle(stroke, 'background-color', this.colors.stroke);
    this._renderer.setStyle(stroke, 'border-right-color', this.colors.stroke);
    this._renderer.setStyle(stroke, 'border-left-color', this.colors.stroke);

    const outer = this._elementRef.nativeElement;
    this._renderer.setStyle(outer.querySelector('.outer'), 'background-color', this.colors.outer);
    this._renderer.setStyle(outer, 'border-right-color', this.colors.outer);
    this._renderer.setStyle(outer, 'border-left-color', this.colors.outer);

    const inner = this._elementRef.nativeElement.querySelector('.inner-wrapper');
    this._renderer.setStyle(inner, 'background-color', this.colors.inner);
    this._renderer.setStyle(inner, 'border-right-color', this.colors.inner);
    this._renderer.setStyle(inner, 'border-left-color', this.colors.inner);
    this._renderer.setStyle(inner, 'color', this.colors.outer);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (!changes.colors?.currentValue) return;
  //   const { stroke, outer, inner } = changes.colors.currentValue
    
  //   this._renderer.setStyle(this._elementRef.nativeElement.querySelector(''), 'background-color', stroke)
  // }

}
