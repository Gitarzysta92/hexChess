import { QueryAction } from "../constants/query-action.enum";

export class QueryResult {
  public action: QueryAction;
  public value: any;
  constructor(result: any) {
    this.action = this._inferQueryActionByResultType(result);
    this.value = result;
  }

  private _inferQueryActionByResultType(result: Object | number[]): QueryAction {
    if (Array.isArray(result) && result.every(x => typeof x === "number")) {
      return QueryAction.Updated
    } else if (typeof result === "number" && result === 0){
      return QueryAction.Failed
    } else if (typeof result === "number"){
      return QueryAction.Deleted
    } else {
      return QueryAction.Created
    }
  }
}
