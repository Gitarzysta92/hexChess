export enum EffectTarget {
  Unit,
  Player
}


export class Effect {
  name!: string;
  target!: EffectTarget;
  durationInTurns!: number;
  declarationTurn!: number;
  payload!: { [key: string]: any };
}