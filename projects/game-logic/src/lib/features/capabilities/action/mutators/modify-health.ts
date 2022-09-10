import { TileType } from "../../../army/constants/tile-type.enum";
import { UnitTile } from "../../../army/models/unit-tile";
import { BoardService } from "../../../board/board-service";
import { Field } from "../../../board/interfaces/field";
import { AttributeType } from "../../attribute/constants/attribute-type";
import { ActionTargetType } from "../constants/target-type";
import { ModifyAttributeAction } from "../interfaces/modify-attribute-action";


export function modifyUnitHealth(board: BoardService, action: ModifyAttributeAction): void {
  let targetFields = [] as Field[];

  if (action.attribute !== AttributeType.Toughness)
    return;

  if (action.targetType === ActionTargetType.Global) {
    targetFields = board.fieldsList;
  } else {
    targetFields = board.getFields(action.coords);
  }

  targetFields
    .map(f => f.tile as UnitTile)
    .filter(t => t.type === TileType.Unit)
    .forEach((t: UnitTile) => t.modifyHealth(action.value))
}