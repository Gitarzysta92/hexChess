import { Subject } from "rxjs";
export declare class List<T> {
    get length(): number;
    listChanged: Subject<number>;
    private _list;
    private _size;
    constructor(settings: Config);
    add(item: T): boolean;
    remove(item: T): void;
    forEach(cb: (req: T) => any): void;
    toArray(): T[];
    clear(): void;
}

export interface Config {
    size?: number;
  
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


export declare class StateContainer<T> {
    get value(): T;
    changed: Subject<T>;
    private _currentState;
    private _states?;
    constructor(initial: T, states?: T[]);
    set(value: T): void;
}