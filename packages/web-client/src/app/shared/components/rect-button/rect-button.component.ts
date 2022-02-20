import { animate, group, query, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { slideInAnimation } from '../../animations/animations/slide-in.animation';
import { slideOutAnimation } from '../../animations/animations/slide-out.animation';
import { swap, swapViews } from '../../animations/predefined-animations';

@Component({
  selector: '[btn]',
  templateUrl: './rect-button.component.html',
  styleUrls: ['./rect-button.component.scss'],
  // host: {
  //   '@routeAnimations': 'true'
  // },
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({ 
              position: 'absolute',
              top: '0',
              left: '0',
            }),
            useAnimation(slideInAnimation('fromTop'), { params: { duration: '200ms', delay: '200ms' } })
          ], { optional: true }), 
          query(':leave', [
            style({ 
              position: 'absolute',
              top: '0',
              left: '0',
            }),
            useAnimation(slideOutAnimation('toBottom'), { params: { duration: '200ms', delay: '0ms' } }),
          ], { optional: true })   
        ]) 
      ])
    ]),

  ]
})
export class RectButtonComponent implements OnInit {
  
  @Input() disabled: boolean = false;
  @Input() outlined: boolean = false;
  @Input() loader: boolean =  false;
  

  @HostBinding('@routeAnimations') get state() { return this.loader };

  constructor() { }

  ngOnInit(): void {
  }

}
