import { animate, animateChild, group, query, sequence, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { timer } from 'rxjs';
import { MyProfileStore } from '../../services/profile.store';
import { RoutingService } from '../../services/routing-service/routing.service';
sequence([
  
  animateChild()
])  
@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translate(0, -30px)' }),
        animate('200ms {{delay}}ms ease-in', style({ opacity: '1', transform: 'translate(0, 0)' })), 
      ], { params: { delay: 0 }, }),

      transition(':leave', [
        style({ opacity: '1', transform: 'translate(0, 0px)' }),
        animate('200ms ease-in', style({ opacity: '0', transform: 'translate(0, -30px)' })), 
      ]),
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
          query('@*', animateChild(), { optional: true })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('150ms ease-out', style({ transform: 'translate(0, 40px)', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            sequence([
              animate('150ms 100ms ease-out', style({ transform: 'translate(0, 0)', opacity: 1 })),
              query('@*', animateChild(), { optional: true })
            ])  
          ], { optional: true })
        ])
      ]),
    ])
  ]
})
export class MainViewComponent implements OnInit {


  public dataLoaded: boolean = false;
  public selectedArmies: string[] = [];

  constructor(
    public readonly routing: RoutingService,
    private readonly _myProfileStore: MyProfileStore,
    private readonly _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    timer(2000)
      .subscribe(() => {
        this.dataLoaded = true;
        this._changeDetector.markForCheck();
      });
  }

  public prepareRoute(outlet: RouterOutlet) {
    if(!outlet.isActivated) return;
    return outlet && outlet.component?.constructor?.name;
  }
  test(event) {
   // console.log(event);
  }
}
