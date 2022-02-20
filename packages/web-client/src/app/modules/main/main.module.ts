import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomViewComponent } from './components/custom-view/custom-view.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { MobileMenuButtonComponent } from './components/mobile-menu-button/mobile-menu-button.component';
import { NavigationalMenuComponent } from './components/navigational-menu/navigational-menu.component';
import { NotFoundViewComponent } from './components/not-found-view/not-found-view.component';
import { MyProfileSharedModule } from '../my-profile';
import { GameModesSharedModule } from '../game-modes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CustomViewComponent,
    MainViewComponent,
    MobileMenuButtonComponent,
    NavigationalMenuComponent,
    NotFoundViewComponent,
  ],
  imports: [
    SharedModule,
    MyProfileSharedModule,
    GameModesSharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    MainViewComponent
  ]
})
export class MainModule { }
