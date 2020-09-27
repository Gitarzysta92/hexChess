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


export declare type CountdownSetup = ICountdownStep[] | Countdown | number;
export interface ICountdownStep {
    id?: any;
    time: number;
    next: (this: CountdownStep, ...args: any) => boolean;
}
export declare class Countdown {
    completed: Subject<void>;
    private _steps;
    constructor(setup: CountdownSetup);
    start(): void;
}
declare class CountdownStep implements ICountdownStep {
    id: any;
    time: number;
    next: ICountdownStep['next'];
    constructor(step: ICountdownStep);
    start(): void;
}
export {};