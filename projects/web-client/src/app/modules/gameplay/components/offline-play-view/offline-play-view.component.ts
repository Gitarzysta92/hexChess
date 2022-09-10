import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCommand } from 'src/app/aspects/services/commands/command-bus/base-command';
import { CommandBusService, DefaultCommandsHandler } from 'src/app/aspects/services/commands/command-bus/command-bus.service';
import { CommandsStackService, RevertableCommand } from 'src/app/aspects/services/commands/commands-stack/commands-stack.service';
import { GameModeType } from 'src/app/constants/game-mode-type.enum';
import { GameData } from '../../models/game-data';
import { GameplayFeed, GameplayService } from '../../services/gameplay/gameplay.service';
import { SceneService } from '../../services/scene/scene.service';

@Component({
  selector: 'offline-play-view',
  templateUrl: './offline-play-view.component.html',
  styleUrls: ['./offline-play-view.component.scss'],
  providers: [ GameplayService, SceneService ]
})
export class OfflinePlayViewComponent implements OnInit {

  gameFeed$: Observable<GameplayFeed>;

  constructor(
    private readonly _commandBusService: CommandBusService,
    private readonly _commandsStack: CommandsStackService,
    private readonly _defaultHandler: DefaultCommandsHandler,
    private readonly _gameplayService: GameplayService,
    private readonly _sceneService: SceneService
  ) { }

  ngOnInit(): void {

    const gameData: GameData = {
      id: "asd",
      type: GameModeType.Hotseat,
      armyAssignments: [
        { profileId: '1', armyId: "432d6de7-24cb-418c-8a6e-77841a36d59c" },
        { profileId: '2', armyId: "937ad7d2-deff-4203-9ec0-290b30e6eaa3" }
      ],
      profiles: [
        { avatar: "", avatarUrl: "", id: "1", nickname: "Player1" },
        { avatar: "", avatarUrl: "", id: "2", nickname: "Player2" }
      ]
    }

    // this._commandBusService.useMapper(this._loggerService)
    // this._commandBusService.useFilter(this._stateTransitionService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);

    this.gameFeed$ = this._gameplayService.initialize(gameData);

    this.gameFeed$.subscribe(() => this._gameplayService.startGame());

    // this.playersOrder = combineLatest(this.gameFeed$,)


    // combineLatest(this.gameFeed$, $onTilesDrawn)
    //   .subscribe(tiles => {
    //     this._dialogService.open()
    //   })


  }

  startUtilizingTile(a: any): void {
    console.log(a);
  }

}