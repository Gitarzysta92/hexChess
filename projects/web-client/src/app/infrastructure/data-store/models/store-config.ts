export interface StoreConfig<T>  {
  initialState: any,
  isLazyLoaded?: boolean,
  actions?: {
    [key: string]: {
      before: Array<(p: any, state: T) => any>,
      action: Function,
      after: Array<(p: any, state: T) => any>
    },
  } 
}