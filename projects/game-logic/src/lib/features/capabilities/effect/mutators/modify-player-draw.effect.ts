import { ActualPlayer } from "../../../game/models/actual-player";
import { Effect } from "../models/effect";

export function resolveModifyPlayerDrawEffect(effects: Effect[], player: ActualPlayer): void {
  const drawDisabledEffect = effects.find(e => e.name === "asd");

  if (!drawDisabledEffect)
    return;
}