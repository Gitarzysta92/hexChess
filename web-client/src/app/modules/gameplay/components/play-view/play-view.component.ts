import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
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
    private readonly _route: ActivatedRoute,
    private readonly _routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.roomId = this._route.snapshot.paramMap.get('roomId');
  }

  public sendMessage(): void {
    this._gameSession.sendMessage(this.roomId);
  }

  public navigateToLobby(): void {
    this._routingService.navigateToLobby();
  }

}
