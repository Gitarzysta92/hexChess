import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { GameModeType } from 'src/app/constants/game-mode-type.enum';
import { RoutingService } from 'src/app/core/services/routing-service/routing.service';
import { LobbyItem } from '../../models/lobby-item';

const lobbyItems = [
  new LobbyItem({
    type: 'gameMode',
    size: '2',
    config: { modeId: 1 }
  }),
  new LobbyItem({
    type: 'gameMode',
    size: '2',
    config: { modeId: 2 }
  }),
  new LobbyItem({
    type: 'gameMode',
    size: '2',
    config: { modeId: 3 }
  }),
  new LobbyItem({
    type: 'gameMode',
    size: '6',
    config: { modeId: 4 }
  }),
]



@Component({
  selector: 'app-lobby-view',
  templateUrl: './lobby-view.component.html',
  styleUrls: ['./lobby-view.component.scss'],
  animations: [
    trigger('slideInTop', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: '0', transform: 'translate(0, -30px)'}),
          stagger('60ms', animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)'})))
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: '0'}),
          stagger('60ms', animate('200ms ease-in-out', style({ opacity: '1'})))
        ], { optional: true })
      ])
    ]),
    
  ]
})
export class LobbyViewComponent implements OnInit {
  public lobbyItems: LobbyItem[] = [];
  
  public showGames: boolean = false;
  public showNotifications: boolean = false;
  
  constructor() { 
    
  }
  
  ngOnInit(): void {
    this.lobbyItems = lobbyItems; 
  }

}
