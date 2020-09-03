import { Component, OnInit } from '@angular/core';
import { GameSessionService } from 'src/app/services/game-session/game-session.service';

@Component({
  selector: 'play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.scss'],
  providers: [
    GameSessionService 
  ]
})
export class PlayViewComponent implements OnInit {

  constructor(
    private readonly _gameSession: GameSessionService
  ) { }

  ngOnInit(): void {

    this._gameSession.sendMessage('test');
  }

  public sendMessage(): void {
    this._gameSession.sendMessage('test');
  }

}
