import { query, transition, trigger, animateChild } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { slideIn, slideOut, swapViews } from 'src/app/shared/animations/predefined-animations';
import { ModalComponent } from 'src/app/shared/dialogs/components/modal/modal.component';
import { MenuService } from '../../../../aspects/navigation/services/menu-service/menu.service';



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
  
  public mainMenu: any;
  public secondaryMenu: any;
  public mobileMenu: any;
  public isOpen: boolean = false;
  
  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _menuService: MenuService,
    public readonly routing: RoutingService
  ) { 
    this.mainMenu = this._menuService.getMenuData(MenuLocation.MainMenu),
    this.secondaryMenu = this._menuService.getMenuData(MenuLocation.SecondaryMenu),
    this.mobileMenu = this._menuService.getMenuData(MenuLocation.MobileMenu) 
  }

  ngOnInit(): void {
    
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
}

