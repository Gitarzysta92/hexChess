import { Activity } from "./activity.interface";
import { Player } from "../features/game/models/player";
import { GameState } from "./game-state";
import { consequentActivities as ca } from "./consequent-activities";
import { StateGenerator } from "./state-generator";
import { ValidationError } from "../extensions/validation-error";



export type DispatcherDirective = (state: GameState, authority: Player) => Activity[] | Activity;
// export type ReversibleActivity = Activity & { rollback: () => GameState };


export class GameDispatcher {

  currentState!: GameState;
  authority!: Player;
  get _activityStack() { return this.currentState.activityStack };

  constructor(
    private readonly _stateGenerator: StateGenerator
  ) { }

  initialize(state: GameState, authority: Player): void {
    this.authority = authority;
    this.currentState = state;
  }

  next(directive: DispatcherDirective) {
    const newState = this.getCurrentStateCopy();
    let activities = directive(newState, this.authority);

    if (!Array.isArray(activities)) {
      activities = [activities];
    }

    for (let activity of activities) {
      const current = this._activityStack[0]?.name;
      const validate = ca[current][activity.name];

      if (!validate) {
        throw new Error(`Given transition not exits: ${current.toString()} => ${activity.name.toString()}`);
      }

      try {
        validate(newState, activity, this.authority)
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          throw new Error(`Transition between ${current.toString()} and ${activity.name.toString()} failed. Validator name: ${(error as ValidationError).message}:`);
        } else {
          throw error;
        } 
      }

      newState.activityStack = this._activityStack;
      this._applyState(newState, activity);
    }

    return this;
  }

  prev() {
    const state = this.currentState?.prevState;
    if (state) {
      this.currentState = state;
    }
  }

  getCurrentStateCopy(): GameState {
    return this._stateGenerator.getCopyOfState(this.currentState);
  }

  private _applyState(state: GameState, activity: Activity): void {
    this._activityStack.unshift(activity);
    const prevState = this.getCurrentStateCopy();
    this.currentState = state;
    this.currentState.prevState = prevState;
  }
}