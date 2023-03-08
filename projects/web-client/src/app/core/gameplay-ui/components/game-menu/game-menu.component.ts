import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpandableListItem } from 'src/app/shared/components/expandable-list/expandable-list.component';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { GameExitConfirmationModalComponent } from '../game-exit-confirmation-modal/game-exit-confirmation-modal.component';


@Component({
  selector: 'game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit, OnDestroy {

  data: any & ExpandableListItem[] = [
    { isActive: true, icon: 'exit-game', label: 'Quit Game', action: (e: MouseEvent) => this.openGameExitModal(e) }
  ]

  private _onDestroy: Subject<void> = new Subject();
  
  constructor(
    private readonly _modalService: ModalService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._onDestroy.next();
  }

  openGameExitModal(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this._modalService.open(GameExitConfirmationModalComponent)
  }

}
