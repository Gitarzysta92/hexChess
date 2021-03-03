import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[btn]',
  templateUrl: './rect-button.component.html',
  styleUrls: ['./rect-button.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ 
          opacity: 0,
          transform: 'translate(0, -200%)',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        }),
        animate('100ms 100ms ease-out', style({ 
          opacity: 1,
          position: 'relative',
          transform: 'translate(0, 0)',
          display: 'block',
        })),
      ]),
      transition(':leave', [
        style({ 
          opacity: 1,
          transform: 'translate(0, 0)',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        }),
        animate('100ms ease-out', style({ 
          opacity: 0,
          position: 'relative',
          transform: 'translate(0, 200%)',
          display: 'block',
        }))
      ])
    ]),
  ],
})
export class RectButtonComponent implements OnInit {
  
  @Input() disabled: boolean = false;
  @Input() outlined: boolean = false;
  @Input() loader: boolean =  false;

  constructor() { }

  ngOnInit(): void {
  }

}
