import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { GameMode } from '../../models/game-mode';
import { GameModesService } from '../../services/game-modes.service';

@Component({
  selector: 'game-mode-tile',
  templateUrl: './game-mode-tile.component.html',
  styleUrls: ['./game-mode-tile.component.scss'],
})
export class GameModeTileComponent implements OnInit, OnDestroy {

  @Input() id: number;

  public name: SafeHtml;
  public description: string;
  public backgroundImage: string;

  private _mode: GameMode;
  private _destroyed: Subject<void>;

  constructor(
    private readonly _gameModesService: GameModesService,
    private readonly _sanitizer: DomSanitizer,
    private readonly _routingService: RoutingService
  ) { 
    this._destroyed = new Subject();
  }

  ngOnInit(): void {
    this._gameModesService.getGameModes()
      .pipe(takeUntil(this._destroyed))
      .subscribe(modes => {
        this._mode = modes.find(m => m.id === this.id);

        if (!this._mode) throw new Error('Cannot find game mode with id: ' + this.id)

        this.name = this._prepareHTMLName(this._mode.name);
        this.description = this._mode.description;
        this.backgroundImage = this._mode.image;

      })
  }

  ngOnDestroy() {
    this._destroyed.next();
  }

  public startMatchmaking(): void {
    this._routingService.navigateToMatchmaking(this._mode.type, this._mode.players)
  }

  private _prepareHTMLName(name: string): SafeHtml {
    const parts = (name || "").split(" ");
    return this._sanitizer.bypassSecurityTrustHtml(`${parts.shift()} <small>${parts.join(" ")}</small>`);
  }

}
