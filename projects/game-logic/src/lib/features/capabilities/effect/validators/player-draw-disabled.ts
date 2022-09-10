import { ActualPlayer } from "../../../game/models/actual-player";
import { Effect } from "../models/effect";

export function isDrawDisabledEffect(effects: Effect[], player: ActualPlayer): boolean {
  const drawDisabledEffect = effects.find(e => e.name === "DrawDisable");
  return drawDisabledEffect?.payload.playerId === player.data?.id;
}