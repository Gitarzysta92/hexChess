import { Subject } from "rxjs";

export class List<T> {
  public get length() {
    return this._list.length;
  }

  public listChanged: Subject<any>;

  private _list: T[] = [];

  private _size: number;

  constructor(settings: any) {
    this._size = settings.size;
    this.listChanged = new Subject();
  }

  public add(item: T): boolean {
    const size = this._size;
    if (size != null && size <= this._list.length) return false;
    return !!this._list.push(item);
  }

  public remove(item: T): void {
    const tempList = [...this._list];
    this._list.length = 0;
    tempList.forEach(tempItem => {
      if (item != tempItem) this._list.push(tempItem);
    });
  }

  public forEach(cb: (req: T) => any) {
    this._list.forEach(cb);
  }

  public toArray() {
    return [...this._list];
  }

  public clear() {
    this._list.length = 0;
  }
}
