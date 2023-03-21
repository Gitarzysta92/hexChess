import { Observable } from "rxjs"

export interface StoreConfig<T>  {
  initialState: T | Observable<T> | Promise<T> | ((...args: any) => T) | Function,
  isLazyLoaded?: boolean,
  actions?: {
    [key: string]: {
      before: Array<(p: any, state: T) => any>,
      action: Function,
      after: Array<(p: any, state: T) => any>
    },
  } 
}