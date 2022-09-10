import { ValidationError } from "../../../extensions/validation-error";
import { GameState, GameStateName } from "../../../state/game-state";

export function isHeadquarterDeployingRound(state: GameState): void {

  if (state.round === 1 &&
    state.name === GameStateName.HeadquarterRound
  ) return;
  
  throw new ValidationError(`${isHeadquarterDeployingRound.name}`);
}


export function isNotHeadquarterDeployingRound(state: GameState): void {

  if (state.round !== 1 &&
    state.name === GameStateName.Round
  ) return;
  
  throw new ValidationError(`${isNotHeadquarterDeployingRound.name}`);
}





// function isCurrentRoundEnded(game: GameState): boolean {
//   return game.round.stateName == state.Ended;
// }

// function isBattleTileWasUsed(game: GameState, ): boolean {
//   const a = game.round.currentActivity.name === 'UseInstantAction';
//   return game.round.actions.last().tileId === game.round.currentActivity.tileId;
// }

// function isAnyWinConditionsHasBeenMet(game: Game): boolean {
//   const atLeastOnePlayerHasZeroLife = false;
//   const gameTimeIsOver = false;
//   const lastFightHasBeenFought = false; 

//   return atLeastOnePlayerHasZeroLife ||
//     gameTimeIsOver  ||
//     lastFightHasBeenFought
// }
