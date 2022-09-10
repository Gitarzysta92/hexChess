import { Player } from "../../../game/models/player";
import { Effect } from "../models/effect";

export function resolveDrawDisabledEffect(effects: Effect[], player: Player): void {
  const drawDisabledEffect = effects.find(e => e.name === "asd");

  if (!drawDisabledEffect)
    return;
}


