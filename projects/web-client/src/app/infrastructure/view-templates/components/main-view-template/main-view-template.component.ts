import { query, transition, trigger, animateChild } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { MenuLocation, MenuService, RoutingService } from 'src/app/aspects/navigation/api';
import { slideIn, slideOut, swapViews } from 'src/app/shared/animations/predefined-animations';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'main-view-template',
  templateUrl: './main-view-template.component.html',
  styleUrls: ['./main-view-template.component.scss'],
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
export class MainViewTemplateComponent implements OnInit, OnDestroy {

  @ViewChild('modal', { static: true }) _mobileMenuModal: ModalComponent

  public mainMenu: any;
  public secondaryMenu: any;
  public mobileMenu: any;
  public isOpen: boolean = false;
  public dataLoaded: boolean = false;
  public selectedArmies: string[] = [];

  private _onDestroy: Subject<void> = new Subject();

  constructor(
    public readonly routing: RoutingService,
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _menuService: MenuService
  ) { 
    this.mainMenu = this._menuService.getMenuData(MenuLocation.MainMenu),
    this.secondaryMenu = this._menuService.getMenuData(MenuLocation.SecondaryMenu),
    this.mobileMenu = this._menuService.getMenuData(MenuLocation.MobileMenu) 
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