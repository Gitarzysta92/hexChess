import { ActionTile } from "../../../features/army/models/action-tile";
import { Army } from "../../../features/army/interfaces/army";
import { HeadquarterTile } from "../../../features/army/models/headquarter-tile";
import { UnitTile } from "../../../features/army/models/unit-tile";
import { AbilityType } from "../../../features/capabilities/ability/constants/ability-type";
import { TileSide } from "../../../features/board/constants/tile-side";
import { AttributeType } from "../../../features/capabilities/attribute/constants/attribute-type";
import { ModuleTile } from "../../../features/army/models/module-tile";
import { ActionType } from "../../../features/capabilities/action/constants/action-type";
import { ActionTargetType } from "../../../features/capabilities/action/constants/target-type";


const headquarter = new HeadquarterTile({
  id: "80030423-5a49-435c-8649-f3570c2f6e9a",
  name: "Borgo headquarter",
  copiesInStack: 1,
  abilities: [
    {
      type: AbilityType.Attack,
      attack: [
        { value: 1, direction: TileSide.Top, initiativeModifier: 0 },
        { value: 1, direction: TileSide.TopLeft, initiativeModifier: 0 },
        { value: 1, direction: TileSide.TopRight, initiativeModifier: 0 },
        { value: 1, direction: TileSide.BottomRight, initiativeModifier: 0 },
        { value: 1, direction: TileSide.BottomLeft, initiativeModifier: 0 },
        { value: 1, direction: TileSide.Bottom, initiativeModifier: 0 },
      ]
    },
    {
      type: AbilityType.ModifyAttribute,
      modify: [
        { value: 1, direction: TileSide.Top, attribute: AttributeType.Initiative },
        { value: 1, direction: TileSide.TopLeft, attribute: AttributeType.Initiative },
        { value: 1, direction: TileSide.TopRight, attribute: AttributeType.Initiative },
        { value: 1, direction: TileSide.BottomRight, attribute: AttributeType.Initiative },
        { value: 1, direction: TileSide.BottomLeft, attribute: AttributeType.Initiative },
        { value: 1, direction: TileSide.Bottom, attribute: AttributeType.Initiative },
      ]
    }
  ]
});


const instantActions = [
  new ActionTile({
    id: '64e53835-e658-4bf6-8bbf-fa31c546e9cc',
    name: 'Granade',
    actions: [
      {
        type: ActionType.Destroy,
        targetType: ActionTargetType.AdjencedToHQ,
        value: 1
      }
    ],
    copiesInStack: 1
  }),
  new ActionTile({
    id: '6b11b757-0bb8-4666-9cc9-ea5d5c063612',
    name: 'Move',
    actions: [
      {
        type: ActionType.Move,
        targetType: ActionTargetType.SingleTarget,
        value: 1
      }
    ],
    copiesInStack: 4
  }),
  new ActionTile({
    id: 'e6a25993-e0f3-4d62-ab0a-849b5de6fb4c',
    name: 'Battle',
    actions: [
      {
        type: ActionType.Battle,
        targetType: ActionTargetType.Global
      }
    ],
    copiesInStack: 6
  }),
];


const units = [
  new UnitTile({
    id: "f51665bc-344e-4a12-a0c3-8eaaf876d1c2",
    name: "Mutant",
    copiesInStack: 6,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: TileSide.Top, initiativeModifier: 0 },
          { value: 1, direction: TileSide.TopLeft, initiativeModifier: 0 },
          { value: 1, direction: TileSide.TopRight, initiativeModifier: 0 }
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 2, initiative: 2 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "971632f1-fab7-428d-87e0-8f585342507e",
    name: "Claws",
    copiesInStack: 4,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: TileSide.TopLeft, initiativeModifier: 0 },
          { value: 1, direction: TileSide.BottomLeft, initiativeModifier: 0 }
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 3, initiative: 3 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "971632f1-fab7-428d-87e0-8f585342507e",
    name: "Super mutant",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: TileSide.Top, initiativeModifier: 0 },
          { value: 1, direction: TileSide.TopLeft, initiativeModifier: 0 },
          { value: 1, direction: TileSide.TopRight, initiativeModifier: 0 }
        ]
      },
      {
        type: AbilityType.Armor,
        directions: [ TileSide.Top, TileSide.TopLeft, TileSide.TopRight ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 2, initiative: 2 },
      { type: AttributeType.Toughness, toughness: 2, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "9648234e-bd0b-4f75-88ce-7488c0f241e4",
    name: "Net fighter",
    copiesInStack: 2,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 3, direction: TileSide.Top, initiativeModifier: 0 },
        ]
      },
      {
        type: AbilityType.Net,
        directions: [ TileSide.Top ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 1, initiative: 1 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "2828aa42-fcaf-4fd1-be13-f551d5abb5c8",
    name: "Brawler",
    copiesInStack: 2,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 2, direction: TileSide.Top, initiativeModifier: 0 },
        ]
      },
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 2, initiative: 2 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "27f1b80e-e2ba-4131-9031-765fa4f5ad81",
    name: "Assasin",
    copiesInStack: 2,
    abilities: [
      {
        type: AbilityType.RangedAttack,
        attack: [
          { value: 1, direction: TileSide.TopLeft, initiativeModifier: 0 },
        ]
      },
      { type: AbilityType.Move, usingsPerRound: 1 }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 3, initiative: 3 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),
]


const modules = [
  // medic gives his life to unit, not add additionall life to unit. Less state changes to track.
  new ModuleTile({
    id: "29d7cbea-84a6-43f1-b4d3-325e50a0bbe0",
    name: "Medic",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Heal,
        value: 1,
        directions: [ TileSide.Top, TileSide.TopLeft, TileSide.TopRight ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "be4756ef-5da3-489a-85b1-cad9832c9d26",
    name: "Officer",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.ModifyAttackStrength,
        modify: [
          { value: 1, attackType: AbilityType.Attack, direction: TileSide.Top },
          { value: 1, attackType: AbilityType.Attack, direction: TileSide.TopLeft },
          { value: 1, attackType: AbilityType.Attack, direction: TileSide.TopRight }
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "618b87ec-4516-4fb8-ab79-6bd8fd6a0e94",
    name: "Super officer",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.ModifyAttackStrength,
        modify: [
          { value: 1, attackType: AbilityType.Attack, direction: TileSide.Top },
          { value: 1, attackType: AbilityType.Attack, direction: TileSide.TopLeft },
          { value: 1, attackType: AbilityType.Attack, direction: TileSide.TopRight }
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 2, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "8a81e036-b3fc-4f3e-bd98-97b6b31bf4a9",
    name: "Scout",
    copiesInStack: 2,
    abilities: [
      {
        type: AbilityType.ModifyAttribute,
        modify: [
          { value: 1, attribute: AttributeType.Initiative, direction: TileSide.Top },
          { value: 1, attribute: AttributeType.Initiative, direction: TileSide.TopLeft },
          { value: 1, attribute: AttributeType.Initiative, direction: TileSide.TopRight }
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 2, wounds: 0 }
    ]
  }),
]


export const borgo = {
  id: "432d6de7-24cb-418c-8a6e-77841a36d59c",
  name: "Borgo",
  tiles: [
    ...instantActions,
    ...units,
    ...modules
  ],
  headquarter: headquarter

} as Army;