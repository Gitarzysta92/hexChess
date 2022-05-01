import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/core';

import { CommandsFactory } from '../../commands/commands-factory';
import { BaseCommand } from '../../lib/command-bus/base-command';
import { CommandBusService, DefaultHandler } from '../../lib/command-bus/command-bus.service';
import { CommandsStackService, RevertableCommand } from '../../lib/commands-stack/commands-stack.service';
import { GameData } from '../../models/game-data';
import { GameLoopAutoDispatcherService } from '../../services/game-loop-auto-dispatcher/game-loop-auto-dispatcher.service';
import { LoggerService } from '../../services/logger/logger.service';
import { StateTransitionValidatorService } from '../../services/state-transition-validator/state-transition-validator.service';


@Component({
  selector: 'play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.scss'],
  providers: [
    //GameSessionService 
  ]
})
export class PlayViewComponent implements OnInit {

  roomId: string;
  gameData: GameData;

  constructor(
    //private readonly _gameSession: GameSessionService,
    private readonly _route: ActivatedRoute,
    private readonly _routingService: RoutingService,
    private readonly _commandBusService: CommandBusService,
    private readonly _commandsStack: CommandsStackService,
    private readonly _defaultHandler: DefaultHandler,
    private readonly _stateTransitionService: StateTransitionValidatorService,
    private readonly _loggerService: LoggerService,
    private readonly _gameLoopAutoDispatcher: GameLoopAutoDispatcherService,
    private readonly _command: CommandsFactory
  ) { }

  ngOnInit(): void {
    this.gameData = this._route.snapshot.data.gameData;

    if (!this.gameData) {
      throw new Error('No game data provided');
    }

    this._commandBusService.useMapper(this._loggerService)
    this._commandBusService.useFilter(this._stateTransitionService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);
    this._commandBusService.useSideEffect(this._gameLoopAutoDispatcher);



    // state shortcuts
    // merge(
    //   this._stateProvider.whenOnlyOnePlayerHaveLifePointsAboveZero,
    //   this._stateProvider.whenBattleInstantActionWasUsed
    // )
    // .subscribe(() => this._commandBusService.dispatch(this._command.create(FinishRound)));

    // // data loading
    // const me = this._gameLoopAutoDispatcher()
      

    // const players = this._playersService.getPlayers();
    // this._playersStateService.init(players);
    
    // const game = this._gameService.getGameSettings();
    // this._gameStateService.init(game, players);

    

    
    // this._commandBusService.dispatch(this._command.create(StartGame));
  }

  public sendMessage(): void {
    //this._gameSession.sendMessage(this.roomId);
  }

  public navigateToLobby(): void {
    this._routingService.navigateToLobby();
  }

}
