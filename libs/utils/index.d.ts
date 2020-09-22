import { Subject } from "rxjs";
export declare class List<T> {
    get length(): number;
    listChanged: Subject<any>;
    private _list;
    private _size;
    constructor(settings: any);
    add(item: T): boolean;
    remove(item: T): void;
    forEach(cb: (req: T) => any): void;
    toArray(): T[];
    clear(): void;
}