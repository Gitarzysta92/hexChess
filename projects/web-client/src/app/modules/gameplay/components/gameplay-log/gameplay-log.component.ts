import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gameplay-log',
  templateUrl: './gameplay-log.component.html',
  styleUrls: ['./gameplay-log.component.scss']
})
export class GameplayLogComponent implements OnInit {

  @Input() logs: any;


  constructor() { }

  ngOnInit(): void {
    this.logs = [
      { message: 'Player 1 started round', icon: 'warning' }
    ]
  }

}
