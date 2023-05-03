import { query, transition, trigger, animateChild } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { delay, first, takeUntil } from 'rxjs/operators';
import { RoutingService } from 'src/app/aspects/navigation/api';
import { MenuLocation } from 'src/app/aspects/navigation/constants/menu-location.enum';
import { SoundEffectsService } from 'src/app/aspects/sound-effects/services/sound-effects.service';
import { mySettings } from 'src/app/core/my-profile/api';
import { IMySettingsDto } from 'src/app/core/my-profile/models/my-settings.dto';

import { AssetLoaderService } from 'src/app/infrastructure/asset-loader/api';
import { StoreService } from 'src/app/infrastructure/data-store/api';
import { slideIn, slideOut, swapViews } from 'src/app/shared/animations/predefined-animations';
import { ModalComponent } from 'src/app/shared/dialogs/components/modal/modal.component';
import { MenuService } from '../../../../aspects/navigation/services/menu-service/menu.service';
import { BACKGROUND_SOUND_THEME } from '../../constants/common-sound-keys';
import { SOUND_COMMON_ASSETS } from '../../constants/sound-common-assets';


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

  public showLoader: boolean = true;
  public selectedArmies: string[] = [];
  
  public mainMenu: any;
  public secondaryMenu: any;
  public mobileMenu: any;
  public isOpen: boolean = false;
  
  private _destroyed: Subject<void> = new Subject();

  constructor(
    private readonly _menuService: MenuService,
    private readonly _routing: RoutingService,
    private readonly _assetLoaderService: AssetLoaderService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _soundEffectsService: SoundEffectsService,
    private readonly _storeService: StoreService
  ) { 
    this.mainMenu = this._menuService.getMenuData(MenuLocation.MainMenu),
    this.secondaryMenu = this._menuService.getMenuData(MenuLocation.SecondaryMenu),
    this.mobileMenu = this._menuService.getMenuData(MenuLocation.MobileMenu) 
  }

  ngOnInit(): void {
    this._routing.onNavigationStart
      .pipe(takeUntil(this._destroyed))
      .pipe(delay(150))
      .subscribe(() => {
        this._mobileMenuModal.close();
      });
    
    forkJoin({
      assets: this._assetLoaderService.loadAssets(SOUND_COMMON_ASSETS),
      settings: this._storeService.getStore<IMySettingsDto>(mySettings).state.pipe(first())
    })
      .pipe(takeUntil(this._destroyed))
      .subscribe(f => {
        this.showLoader = false;
        this._soundEffectsService.play(BACKGROUND_SOUND_THEME, f.settings.sound.musicVolume, f.settings.sound.isMuted, true);
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}