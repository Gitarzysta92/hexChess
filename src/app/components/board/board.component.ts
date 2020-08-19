import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board: Array<Array<any>>;

  constructor() { 
    this.board = [
      [1,2,3],
      [1,2,3,4],
      [1,2,3,4,5],
      [1,2,3,4],
      [1,2,3]
    ];
  }

  ngOnInit() {
  }

}
