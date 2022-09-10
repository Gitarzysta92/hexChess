import { ActionTile } from "../../../features/army/models/action-tile";
import { Army } from "../../../features/army/interfaces/army";
import { HeadquarterTile } from "../../../features/army/models/headquarter-tile";
import { UnitTile } from "../../../features/army/models/unit-tile";
import { AbilityType } from "../../../features/capabilities/ability/constants/ability-type";
import { Direction } from "../../../features/board/constants/tile-sides";

import { AttributeType } from "../../../features/capabilities/attribute/constants/attribute-type";
import { ModuleTile } from "../../../features/army/models/module-tile";
import { ActionType } from "../../../features/capabilities/action/constants/action-type";
import { ActionTargetType } from "../../../features/capabilities/action/constants/target-type";


const headquarter = new HeadquarterTile({
  id: "e467d0c7-b0f7-466c-aa76-d856ab87dd2c",
  name: "Hegemony headquarter",
  copiesInStack: 1,
  abilities: [
    {
      type: AbilityType.Attack,
      attack: [
        { value: 1, direction: Direction.Top, initiativeModifier: 0 },
        { value: 1, direction: Direction.TopLeft, initiativeModifier: 0 },
        { value: 1, direction: Direction.TopRight, initiativeModifier: 0 },
        { value: 1, direction: Direction.BottomRight, initiativeModifier: 0 },
        { value: 1, direction: Direction.BottomLeft, initiativeModifier: 0 },
        { value: 1, direction: Direction.Bottom, initiativeModifier: 0 },
      ]
    },
    {
      type: AbilityType.ModifyAttackStrength,
      modify: [
        { value: 1, attackType: AbilityType.Attack, direction: Direction.Top },
        { value: 1, attackType: AbilityType.Attack, direction: Direction.TopLeft },
        { value: 1, attackType: AbilityType.Attack, direction: Direction.TopRight },
        { value: 1, attackType: AbilityType.Attack, direction: Direction.BottomRight },
        { value: 1, attackType: AbilityType.Attack, direction: Direction.BottomLeft },
        { value: 1, attackType: AbilityType.Attack, direction: Direction.Bottom },
      ]
    }
  ]
});


const instantActions = [
  new ActionTile({
    id: 'f7d202ae-3257-4f5c-8bd9-e7f40b291be1',
    name: 'Sniper',
    actions: [
      {
        type: ActionType.ModifyAttribute,
        attribute: AttributeType.Toughness,
        targetType: ActionTargetType.SingleTarget,
        value: -1
      } as any
    ],
    copiesInStack: 1
  }),
  new ActionTile({
    id: '8410f971-82be-47c0-b016-49123b928be2',
    name: 'Move',
    actions: [
      {
        type: ActionType.Move,
        targetType: ActionTargetType.SingleTarget,
        value: 1
      }
    ],
    copiesInStack: 3
  }),
  new ActionTile({
    id: 'dfc22002-6121-4e76-b20a-0239740014ac',
    name: 'Battle',
    actions: [
      {
        type: ActionType.Battle,
        targetType: ActionTargetType.Global
      }
    ],
    copiesInStack: 5
  }),
  new ActionTile({
    id: '52329582-835a-4e27-bf38-cdf88fc90e5e',
    name: 'Push back',
    actions: [
      {
        type: ActionType.Push,
        targetType: ActionTargetType.SingleTarget,
      }
    ],
    copiesInStack: 2
  }),
];


const units = [
  new UnitTile({
    id: "1d0f7d68-8650-4c5d-b2e4-98ee2c40d230",
    name: "Runner",
    copiesInStack: 3,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: Direction.Top, initiativeModifier: 0 },
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 2, initiative: 2 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "44e5a3ec-735a-4196-a86f-0b63a60b1414",
    name: "Thug",
    copiesInStack: 3,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 2, direction: Direction.Top, initiativeModifier: 0 },
          { value: 1, direction: Direction.TopLeft, initiativeModifier: 0 },
          { value: 1, direction: Direction.TopRight, initiativeModifier: 0 }
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 2, initiative: 2 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "1c727430-85bf-4078-89ef-838db4c5d84c",
    name: "Ganger",
    copiesInStack: 4,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: Direction.TopLeft, initiativeModifier: 0 }
        ]
      },
      {
        type: AbilityType.Armor,
        directions: [ Direction.Top, Direction.TopLeft, Direction.TopRight ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 3, initiative: 3 },
      { type: AttributeType.Toughness, toughness: 2, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "3c3cd958-98dd-4798-9a8c-d5ffce1c9b1f",
    name: "Gladiator",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 2, direction: Direction.Top, initiativeModifier: 0 },
          { value: 2, direction: Direction.TopLeft, initiativeModifier: 0 },
          { value: 2, direction: Direction.TopRight, initiativeModifier: 0 },
        ]
      },
      {
        type: AbilityType.Armor,
        directions: [ Direction.Top, Direction.TopLeft, Direction.TopRight ]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 1, initiative: 1 },
      { type: AttributeType.Toughness, toughness: 2, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "d69d0a79-9a27-474e-89f0-23bbfbb2700f",
    name: "Net Fighet",
    copiesInStack: 2,
    abilities: [
      {
        type: AbilityType.Net,
        directions: [ Direction.TopRight ]
      },
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "1f8165fc-3c93-44cd-81a1-05d1f634b760",
    name: "Net Master",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: Direction.Bottom, initiativeModifier: 0 },
        ]
      },
      {
        type: AbilityType.Net,
        directions: [ Direction.BottomLeft, Direction.BottomRight ]
      },
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 2, initiative: 2 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "1ce351ed-fc6e-486d-ac5f-c2b8797786e0",
    name: "Guard",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [
          { value: 1, direction: Direction.Top, initiativeModifier: 0 },
          { value: 1, direction: Direction.TopLeft, initiativeModifier: 0 },
          { value: 1, direction: Direction.Bottom, initiativeModifier: 0 },
        ]
      },
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 1, initiative: 1 },
      { type: AttributeType.Toughness, toughness: 2, wounds: 0 }
    ]
  }),

  new UnitTile({
    id: "503e9d2b-0ae8-44a1-9bbe-971b33fb93fb",
    name: "Universal Soldier",
    copiesInStack: 3,
    abilities: [
      {
        type: AbilityType.Attack,
        attack: [{ value: 1, direction: Direction.TopLeft, initiativeModifier: 0 }]
      },
      {
        type: AbilityType.RangedAttack,
        attack: [{ value: 1, direction: Direction.TopLeft, initiativeModifier: 0 }]
      }
    ],
    attributes: [
      { type: AttributeType.Initiative, baseInitiative: 3, initiative: 1 },
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),
]


const modules = [
  new ModuleTile({
    id: "2e552e29-31fc-4c11-9e65-a2056a70b511",
    name: "The Boss",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.ModifyAttackStrength,
        modify: [
          { value: 1, attackType: AbilityType.Attack, direction: Direction.Top },
          { value: 1, attackType: AbilityType.Attack, direction: Direction.TopLeft },
        ]
      },
      {
        type: AbilityType.ModifyAttribute,
        modify: [
          { value: 1, attribute: AttributeType.Initiative, direction: Direction.Top },
          { value: 1, attribute: AttributeType.Initiative, direction: Direction.TopLeft },
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "be4756ef-5da3-489a-85b1-cad9832c9d26",
    name: "Officer",
    copiesInStack: 2,
    abilities: [
      {
        type: AbilityType.ModifyAttackStrength,
        modify: [
          { value: 1, attackType: AbilityType.Attack, direction: Direction.Top },
          { value: 1, attackType: AbilityType.Attack, direction: Direction.TopLeft },
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "3224c8c3-8dd5-4123-92cc-b2064f673298",
    name: "Officer II",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.ModifyAttackStrength,
        modify: [
          { value: 1, attackType: AbilityType.Attack, direction: Direction.Top },
          { value: 1, attackType: AbilityType.Attack, direction: Direction.TopLeft },
          { value: 1, attackType: AbilityType.Attack, direction: Direction.TopRight },
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "b36398ad-d219-4456-b2c4-3c1160ec9bcc",
    name: "Transport",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Provide,
        value: 1,
        action: ActionType.Move,
        actionTarget: ActionTargetType.Adjenced,
        directions: [
          Direction.Top,
          Direction.TopRight,
          Direction.BottomRight,
          Direction.Bottom,
          Direction.BottomLeft,
          Direction.TopLeft
        ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),

  new ModuleTile({
    id: "58d2e19d-b032-4e39-9eeb-7b174ec4a11d",
    name: "Quartermaster",
    copiesInStack: 1,
    abilities: [
      {
        type: AbilityType.Provide,
        value: 1,
        action: ActionType.SwapAttack,
        actionTarget: ActionTargetType.Adjenced,
        directions: [ Direction.Top ]
      }
    ],
    attributes: [
      { type: AttributeType.Toughness, toughness: 1, wounds: 0 }
    ]
  }),
]


export const hegemony = {
  id: "937ad7d2-deff-4203-9ec0-290b30e6eaa3",
  name: "Hegemony",
  tiles: [
    ...instantActions,
    ...units,
    ...modules
  ],
  headquarter: headquarter
} as Army;