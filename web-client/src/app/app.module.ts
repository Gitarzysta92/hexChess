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
    ReactiveFormsModule

  ],
  providers: [
<<<<<<< HEAD:src/app/app.module.ts
=======
    UserService,
>>>>>>> e8c20dd1751def52acb8d3f8f705bc7e3e9e54a9:web-client/src/app/app.module.ts
    { provide: Window, useValue: window },
    { provide: Document, useValue: document }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
