import { Observable } from "rxjs"
import { IActionContext } from "./action-context"
import { IStateStorage } from "./store-state-storage"

export interface IStoreConfig<S>  {
  initialState: S | Observable<S> | Promise<S> | ((...args: any) => S) | Function,
  isLazyLoaded?: boolean,
  stateStorage?: IStateStorage<S>
  actions?: {
    [key: symbol]: {
      before?: Array<(c: IActionContext<S>) => any>,
      action: (c: IActionContext<S>) => any,
      after?: Array<(c: IActionContext<S>) => any>
    },
  } 
}