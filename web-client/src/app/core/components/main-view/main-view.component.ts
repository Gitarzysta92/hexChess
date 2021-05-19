import { animate, animateChild, group, query, sequence, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MenuService } from '../../services/menu-service/menu.service';
import { MyProfileStore } from '../../services/profile.store';
import { RoutingService } from '../../services/routing-service/routing.service';
import { UserService } from '../../services/user-service/user.service';
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
export class MainViewComponent implements OnInit, OnDestroy {

  @ViewChild('modal', { static: true }) _mobileMenuModal: ModalComponent


  public dataLoaded: boolean = false;
  public selectedArmies: string[] = [];
  private _onDestroy: Subject<void> = new Subject();
  mainMenu: any;
  secondaryMenu: any;
  mobileMenu: any;

  constructor(
    public readonly routing: RoutingService,
    private readonly _myProfileStore: MyProfileStore,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _userService: UserService,
    private readonly _menuService: MenuService
  ) { 
    this.mainMenu = this._menuService.getMenuData(MenuLocations.MainMenu),
    this.secondaryMenu = this._menuService.getMenuData(MenuLocations.SecondaryMenu),
    this.mobileMenu = this._menuService.getMenuData(MenuLocations.MobileMenu) 
  }

  ngOnInit(): void {
    
    //this._userService.asd().subscribe(console.log);

    timer(2000)
      .subscribe(() => {
        this.dataLoaded = true;
        this._changeDetector.markForCheck();
      });

    this.routing.onNavigationEnd
      .pipe(takeUntil(this._onDestroy))
      .pipe(delay(150))
      .subscribe(event => {
        this._mobileMenuModal.close();
      });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public prepareRoute(outlet: RouterOutlet) {
    if(!outlet.isActivated) return;
    return outlet && outlet.component?.constructor?.name;
  }
}
