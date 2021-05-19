import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from './utils/ng-web-sockets/ng-web-sockets.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ICONS, IconsToken } from './constants/icons';
import { MainViewComponent } from './core/components/main-view/main-view.component';
import { MatchmakingSharedModule } from './modules/matchmaking/matchmaking.module';
import { ProfileSharedModule } from './modules/profile/profile.module';
import { CustomViewComponent } from './core/components/custom-view/custom-view.component';
import { GameModesSharedModule } from './modules/game-modes/game-modes.module';
import { ResourcesInterceptor } from './core/interceptors/http.interceptor';
import { NavigationalMenuComponent } from './core/components/navigational-menu/navigational-menu.component';






const config: SocketIoConfig = { url: 'http://localhost:8988', options: {
  
} };

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    CustomViewComponent,
    NavigationalMenuComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    MatchmakingSharedModule,
    GameModesSharedModule,
    ProfileSharedModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResourcesInterceptor, multi: true },
    { provide: IconsToken, useValue: ICONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
