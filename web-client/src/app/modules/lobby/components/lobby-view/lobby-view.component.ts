import { animate, animateChild, group, query, sequence, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lobby-view',
  templateUrl: './lobby-view.component.html',
  styleUrls: ['./lobby-view.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translate(0, -30px)', display: 'block' }),
        sequence([
          animate('200ms ease-in-out', style({ opacity: '1', transform: 'translate(0, 0)', display: 'block' })),
          animateChild()
        ])  
      ]),
    ]),
  ]
})
export class LobbyViewComponent implements OnInit {

  public showGames: boolean = false;
  public showNotifications: boolean = false;
  
  constructor() { 
    //this.fullImagePath = 'assets/images/therealdealportfoliohero.jpg'
  }

  ngOnInit(): void {}
}
