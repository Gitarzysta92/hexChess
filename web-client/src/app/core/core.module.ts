import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundViewComponent } from './components/not-found-view.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { SecondaryMenuComponent } from './components/secondary-menu/secondary-menu.component';



@NgModule({
  declarations: [
    NotFoundViewComponent,
    MainViewComponent,
    SecondaryMenuComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
})
export class AppModule { }
