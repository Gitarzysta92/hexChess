import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'tile',
  template: `<div>
              <div></div>
              <div class="content-wrapper">
                <ng-content></ng-content>
              </div>
            </div>`,
  styleUrls: ['./tile.component.scss'],
  animations: [
    trigger('showTile', [
      state('visible', style({
        opacity: '1',
        transform: 'translate(0, 0)'
      })),
      state('hidden', style({
        opacity: '0',
        transform: 'translate(0, -30px)'
      })),
      transition('* => visible', animate('200ms {{ delay }}ms ease-in'), { params : { delay: 600 } }),
      //transition('selected => deselected', animate('500ms ease-out'))
    ])
  ]
})
export class TileComponent implements OnInit {



  @HostBinding('@showTile') get showTile() { return this.state }

  // @HostListener('@showTile.start', ['$event']) startDrawerHandler(event: any): void {
  //   console.log(event);
  // }

  // @HostListener('@showTile.done', ['$event']) doneDrawerHandler(event: any): void {
  //   console.log(event);
  // }

  public state: any;

  @Input() delay: number = 0;

  @Input() text: string = '';

  @Input() backgroundImage: string = ''

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _host: ElementRef
  ) { 
    this.state = {
      value: 'hidden',
      params: {
        delay: this.delay
      }
    }  
  }

  ngOnInit(): void {
    setTimeout(() => this.state = {
      value: 'visible',
      params: {
        delay: this.delay
      }   
    },0);
    
    this._renderer.setStyle(this._host.nativeElement.querySelector('div:first-child'), 'background-image', `url('${this.backgroundImage}')`)
  }

}
