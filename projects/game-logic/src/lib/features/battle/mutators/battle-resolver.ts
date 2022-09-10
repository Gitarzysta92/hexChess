export interface BattleResult {
  resolved: boolean;
  initiativeStages: any[],
  amibiguities: any[]
}

export function* battleResolver(board: any, effects: any): Generator<BattleResult> {
  const result: BattleResult = {
    resolved: false,
    initiativeStages: [],
    amibiguities: []
  };

  let i = null;
  resolveBattleStartEffects(effects);

  while (i === null || i !== 0) {
    let bc = board.copy();

    resolvePreAttackPhase(bc);

      if (i == null) {
        i = getHighestInitiative(bc);
      }

    resolveAttackPhase(bc);
    
    result.amibiguities = checkForAmbiguities(bc)
    if (result.amibiguities.length > 0) {
      yield result;
    }

    resolveBoardCleanupPhase(bc);
    result.initiativeStages.push(bc);

    i -= 1;
  }

  result.resolved = true;
  result.amibiguities = [];
  return result;
}


function resolvePreAttackPhase(board: any): void {
  for (let tile of board) {
    calculateSummarizedTileStats(tile);
    attachTakingDamageResolvers(tile);
    // attachLeavingFiledResolvers(boar);boar}
  }
}

function resolveAttackPhase(board: any): void {
  for (let tile of board) {
    tile?.attack();
  }
}

function resolveBoardCleanupPhase(board: any): void {
  for (let tile of board) {
    if (tile.health <= 0) {
      board.removeTile(tile);
    } 
  }
}


function getHighestInitiative(board: any): number {
  let initiative = 0;
  for (let tile of board) {
    initiative = tile.initiative > initiative ? tile.initiative : initiative; 
  }
  return initiative;
}

function checkForAmbiguities(board: any): any[] {
  const amibiguities = [] as any[];
  for (let tile of board) {
    const result = tile.checkAmbiguity();
    if (result) {
      amibiguities.push(result);
    }
  }
  return amibiguities;
}






function calculateSummarizedTileStats(tile: any): void {

}


function attachTakingDamageResolvers(tile: any): void {

}
  

function resolveBattleStartEffects(effects: any): void {

}