import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ICONS, IconsToken } from './constants/icons';

import { MainModule } from './modules/main';
import { GameModesSharedModule } from './modules/game-modes';
import { MatchmakingSharedModule } from './modules/matchmaking';
import { MyProfileSharedModule } from './modules/my-profile';
import { NotificationsSharedModule } from './modules/notifications';
import { Authentication } from './modules/authentication';
import { MyErrorHandler } from './core/error-handler';
import { ErrorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { ResourcesInterceptor } from './core/interceptors/http.interceptor';



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
    MainModule
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: HTTP_INTERCEPTORS, useClass: Authentication.Interceptor, multi: true },
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