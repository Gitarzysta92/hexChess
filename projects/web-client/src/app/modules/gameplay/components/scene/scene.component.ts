import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CoordsHelper } from 'hexchess-game-logic/dist/lib/features/board/coords-helper';
import { Coord } from 'hexchess-game-logic/dist/lib/features/board/interfaces/coords';
import { CommandBusService } from 'src/app/aspects/services/commands/command-bus/command-bus.service';
import { CommandsFactory } from 'src/app/aspects/services/commands/commands-factory';
import { SceneService } from '../../services/scene/scene.service';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnChanges {

  @Input() coords: Coord[] = [];

  @ViewChild('canvas', { static: true }) _canvas: ElementRef | undefined;
  scene: any;

  constructor(
    private readonly _command: CommandsFactory,
    private readonly _commandBus: CommandBusService,
    private readonly _sceneService: SceneService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) { 
    this._changeDetectorRef.detach();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._sceneService.adjustRendererSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.coords) {
      this.scene = this._sceneService.createScene(this._canvas?.nativeElement, this.coords);
      this._changeDetectorRef.detectChanges();
    }
  }

  public intersect(event: MouseEvent) {
    //const command = this._command.create(MakeTileAction).setParameters({ x: event.x, y: event.y });
    //this._commandBus.dispatch(command);
  }
}
