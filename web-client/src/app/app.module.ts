import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardTileComponent } from './components/board-tile/board-tile.component';
import { PlayerBoardComponent } from './components/player-board/player-board.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { RegistrationViewComponent } from './components/registration-view/registration-view.component';
import { MainMenuViewComponent } from './components/main-menu-view/main-menu-view.component';
import { PlayViewComponent } from './components/play-view/play-view.component';
import { UserService } from './services/user-service/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardTileComponent,
    PlayerBoardComponent,
    LoginViewComponent,
    RegistrationViewComponent,
    MainMenuViewComponent,
    PlayViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    UserService,
    { provide: Window, useValue: window },
    { provide: Document, useValue: document }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
