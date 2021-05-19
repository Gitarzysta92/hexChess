export type Create = QueryAction.Create;
export type Read = QueryAction.Read;
export type Update = QueryAction.Update;
export type Delete = QueryAction.Delete;


export enum QueryAction {
  Create,
  Read,
  Update,
  Delete,
}

export type AffectedRows = number[];


type QueryValue<A, R> = 
  A extends QueryAction.Create ? R : 
  A extends QueryAction.Read ? R :
  A extends QueryAction.Update ? [number, R[]] :
  A extends QueryAction.Delete ? AffectedRows : 
  unknown;

export class QueryResult<A extends QueryAction, T> {
  public action: QueryAction;
  public value: QueryValue<A, T>;
  public success: boolean;
  constructor(action: A, result: QueryValue<A, T>) {
    this.action = action;
    this.value = result;
    this.success = this._inferQueryStatus(this.action, this.value);
  }

  private _inferQueryStatus(action: QueryAction, value: QueryValue<QueryAction, T>): boolean {
    let result;

    switch(action) {
      case QueryAction.Create: {
        result = this._getCreateActionStatus(value as QueryValue<Create, T>);
        break;
      }
      case QueryAction.Read: { 
        result = this._getReadActionStatus(value as QueryValue<Read, T>);
        break;
      }
      case QueryAction.Update:  {
        result = this._getUpdateActionStatus(value as QueryValue<Update, T>);
        break;
      }
      case QueryAction.Delete:  {
        result = this._getDeleteActionStatus(value as QueryValue<Delete, T>);
        break
      }
    }

    return result;
  }

  private _getCreateActionStatus(value: QueryValue<Create, T>): boolean {
    return !!value
  }

  private _getReadActionStatus(value: QueryValue<Read, T>): boolean {
    return !!value
  }

  private _getUpdateActionStatus(value: QueryValue<Update, T>): boolean {
    if (!Array.isArray(value)) {
      return false;
    } else {
      return value[0] > 0;
    }
  }

  private _getDeleteActionStatus(value: QueryValue<Delete, T>): boolean {
    if (!Array.isArray(value)) {
      return false;
    } else {
      return value.every(v => v > 0);
    }
  }

}
