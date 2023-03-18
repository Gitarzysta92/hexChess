import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ICONS, IconsToken } from './shared/icons/constants/icons';

import { GameModesSharedModule } from './core/game-modes/api';
import { MatchmakingSharedModule } from './core/matchmaking/api';
import { MyProfileSharedModule } from './core/my-profile/api';
import { NotificationsSharedModule } from './aspects/notifications/api';
import { Identity } from './core/identity/identity.routing';
import { MainModule } from './core/main/main.module';
import { ArmiesSharedModule } from './core/armies/armies.shared-module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatchmakingSharedModule,
    GameModesSharedModule,
    MyProfileSharedModule,
    NotificationsSharedModule.forRoot(),
    ArmiesSharedModule.forRoot(),
    MainModule
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: HTTP_INTERCEPTORS, useClass: Identity.Interceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ResourcesInterceptor, multi: true },
    { provide: IconsToken, useValue: ICONS },
    //{ provide: ErrorHandler, useClass: MyErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//export const token = new InjectionToken<string>('BaseUrl');
//import { SocketIoConfig, SocketIoModule } from './utils/ng-web-sockets/ng-web-sockets.module';
//SocketIoModule.forRoot(config)
//