import { query, transition, trigger, animateChild } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { MenuLocations } from 'src/app/constants/menu-locations.enum';
import { slideIn, slideOut, swapViews } from 'src/app/shared/animations/predefined-animations';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MenuService } from '../../services/menu-service/menu.service';
import { RoutingService } from '../../services/routing-service/routing.service';



@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideIn('slideIn'),
    slideOut('slideOut'),
    swapViews('routeAnimations'),
    trigger('triggerChilds', [
      transition('void => loaded', [
        query('@*', animateChild(), { optional: true })
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
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _menuService: MenuService
  ) { 
    this.mainMenu = this._menuService.getMenuData(MenuLocations.MainMenu),
    this.secondaryMenu = this._menuService.getMenuData(MenuLocations.SecondaryMenu),
    this.mobileMenu = this._menuService.getMenuData(MenuLocations.MobileMenu) 
  }

  ngOnInit(): void {

    timer(2000)
      .subscribe(() => {
        this.dataLoaded = true;
        this._changeDetector.markForCheck();
      });

    this.routing.onNavigationStart
      .pipe(takeUntil(this._onDestroy))
      .pipe(delay(150))
      .subscribe(() => {
        this._mobileMenuModal.close();
      });

  }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  public prepareRoute(outlet: RouterOutlet) {
    if(!outlet.isActivated) return 'void';
    return outlet && outlet.component?.constructor?.name;
  }

}

