import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // temp
  rotate: boolean;

  margin: number;


  public board: Array<Array<any>>;

  public tileSize: number = 200;


  @HostListener('window:resize', ['$event'])
  onResize(event) {  
    this._setTileSize();
  }

  constructor(
    private _window: Window,
    private _hostElemRef: ElementRef
  ) { 


    this.rotate = false;
    this.board = [
      [[],[],[]],
      [[],[],[],[]],
      [[],[],[],[],[]],
      [[],[],[],[]],
      [[],[],[]]
    ];
  }

  ngOnInit() {
    this._setTileSize();
  }

  private _setTileSize(): void {
    // const height = this._hostElemRef.nativeElement.offsetHeight;
    // const width = this._hostElemRef.nativeElement.offsetWidth;

    // console.log(height, width);

    // if (height < width) this.tileSize = height / 5;
    // else this.tileSize = width / 5;

    this.tileSize = this._hostElemRef.nativeElement.offsetWidth / 5;

    const x = this.tileSize / 50;
    const pow = Math.pow(x, 3);

    this.margin = Math.trunc( (pow / 2)+ x/2 + 20);
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
