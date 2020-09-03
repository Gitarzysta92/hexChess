import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board-service/board.service';

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
  dragItemRect: any;
  dragPosition: any;

  mouseX: any;
  mouseY: any;

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    this._boardService.setTileSize(this.tileSize);
  }


  constructor(
    private _hostElemRef: ElementRef,
    private _document: Document,
    private _boardService: BoardService
  ) { 
    this.tileSize = 200;

    this.dragPosition = { x: 50, y: 50 };


    this.items = [
      [{ name: 'asdasd' }],
      [{ name: 'gsdgsd' }],
      [{ name: 'fghfgh' }],
    ];

    this._boardService.tileSize.subscribe(result => {
      this.tileSize = result;
    });
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
    this.dragItem = event.source;
    this.dragItemRect = event.source.element.nativeElement.getBoundingClientRect();

    this.dragItemRect.x = this.mouseX - this.dragItemRect.left;
    this.dragItemRect.y = this.mouseY - this.dragItemRect.top; 

  }

  constrainPosition = (event, ref) => {
    const nativeElement = (ref.data.element.nativeElement as HTMLElement);

    //event.x = event.x - this.dragItemRect.x;
    //event.y = event.y - this.dragItemRect.y;

    return event;
  }

  setMouseCoordinates(event: MouseEvent) {
     this.mouseX = event.pageX;
     this.mouseY = event.pageY;
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
