import { Component, OnInit, ElementRef, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // host: {
  //   '[style.width.px]' : 'width',
  //   '[style.height.px]' : 'height'
  // }
})
export class BoardTileComponent implements OnInit, OnChanges {

  //@Input() size: number;

  constructor() { 

  }

  ngOnChanges() {

  }

  ngOnInit() {
  }

}
