import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {

  @ViewChild('tilesContainer', { static: true }) tilesContainer: ElementRef;

  tileSize: number;
  items: Array<any>;

  dragItem: any;
  dragPosition: any;

  constructor(
    private _hostElemRef: ElementRef
  ) { 
    this.tileSize = 200;

    this.dragPosition = { x: 50, y: 50 };


    this.items = [
      [{ name: 'asdasd' }],
      [{ name: 'gsdgsd' }],
      [{ name: 'fghfgh' }],
    ]
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  dragStarted(event) {
    this.tileSize = this.tilesContainer.nativeElement.offsetWidth;
    this.dragItem = event.source
  }

  constrainPosition(event, ref) {
    const nativeElement = (ref.data.element.nativeElement as HTMLElement);

    console.log('asd', event, nativeElement.getBoundingClientRect());
    return event;
  }


  // private _setTileSize(): void {
  //   // const height = this._hostElemRef.nativeElement.offsetHeight;
  //   // const width = this._hostElemRef.nativeElement.offsetWidth;

  //   // console.log(height, width);

  //   // if (height < width) this.tileSize = height / 5;
  //   // else this.tileSize = width / 5;

    

  //   const x = this.tileSize / 50;
  //   const pow = Math.pow(x, 3);

  //   this.margin = Math.trunc( (pow / 2)+ x/2 + 20);
  // }

}
