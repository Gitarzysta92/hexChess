import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameSessionService } from 'src/app/modules/matchmaking/services/game-session/game-session.service';


@Component({
  selector: 'play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.scss'],
  providers: [
    GameSessionService 
  ]
})
export class PlayViewComponent implements OnInit {

  roomId: string;

  constructor(
    private readonly _gameSession: GameSessionService,
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roomId = this._route.snapshot.paramMap.get('roomId');
  }

  public sendMessage(): void {
    this._gameSession.sendMessage(this.roomId);
  }

}
