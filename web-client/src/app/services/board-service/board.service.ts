import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  tileSize: EventEmitter<number>;

  constructor() { 
    this.tileSize  = new EventEmitter();
  }


  public setTileSize(size: number): void {
    this.tileSize.next(size);
  }
}
