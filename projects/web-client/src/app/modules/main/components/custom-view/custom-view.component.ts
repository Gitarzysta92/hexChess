import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutingService } from 'src/app/core';


@Component({
  selector: 'custom-view',
  templateUrl: './custom-view.component.html',
  styleUrls: ['./custom-view.component.scss'],
  animations: [
    trigger('slideIn', [
      state('visible', style({
        opacity: '1',
        transform: 'translate(0, 0)'
      })),
      state('hidden', style({
        opacity: '0',
        transform: 'translate(0, -30px)'
      })),
      transition('hidden => visible', animate('200ms {{ delay }}ms ease-in'), { params : { delay: 0 } }),
      //transition('selected => deselected', animate('500ms ease-out'))
    ]),
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter', [
          style({ 
            transform: 'translate(0, -40px)',
            opacity: 0,
            position: 'absolute'
          })
        ], { optional: true }),
        query(':leave', [
          style({ 
            transform: 'translate(0, 0)',
            position: 'absolute',
            opacity: 1
          }),
          animateChild()
        ], { optional: true }),
        group([
          query(':leave', [
            animate('150ms ease-out', style({ transform: 'translate(0, 40px)', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('150ms 100ms ease-out', style({ transform: 'translate(0, 0)', opacity: 1 })),
            animateChild()
          ], { optional: true })
        ])
      ]),
    ])
  ]
})
export class CustomViewComponent implements OnInit {


  public state: boolean = false;
  public dataLoaded: boolean = false;
  public selectedArmies: string[] = [];

  
  public isOpen: boolean = false;

  constructor(
    public readonly routing: RoutingService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataLoaded = true;
      setTimeout(() => {
        this.state = true;
      },300)
  
    },2000)
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}
