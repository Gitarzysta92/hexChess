export const borgo = {
  "id": "432d6de7-24cb-418c-8a6e-77841a36d59c",
  "name": "Borgo",
  "colors": {
    "outer": '#30c2ff',
    "inner": '#1a406b',
    "stroke": '#0578fa'
  },
  "icon": 'borgo',
  "tiles": [
    {
      "id": "64e53835-e658-4bf6-8bbf-fa31c546e9cc",
      "name": "Granade",
      "actions": [
        {
          "type": "Destroy",
          "targetType": 5,
          "value": 1
        }
      ],
      "copiesInStack": 1,
      "type": "InstantAction"
    },
    {
      "id": "6b11b757-0bb8-4666-9cc9-ea5d5c063612",
      "name": "Move",
      "actions": [
        {
          "type": "Move",
          "targetType": 0,
          "value": 1
        }
      ],
      "copiesInStack": 4,
      "type": "InstantAction"
    },
    {
      "id": "e6a25993-e0f3-4d62-ab0a-849b5de6fb4c",
      "name": "Battle",
      "actions": [
        {
          "type": "Battle",
          "targetType": 2
        }
      ],
      "copiesInStack": 6,
      "type": "InstantAction"
    },
    {
      "id": "f51665bc-344e-4a12-a0c3-8eaaf876d1c2",
      "name": "Mutant",
      "copiesInStack": 6,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
              "direction": 0,
              "initiativeModifier": 0
            },
            {
              "value": 1,
              "direction": 5,
              "initiativeModifier": 0
            },
            {
              "value": 1,
              "direction": 1,
              "initiativeModifier": 0
            }
          ]
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 2,
          "initiative": 2
        },
        {
          "type": 0,
          "toughness": 1,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "971632f1-fab7-428d-87e0-8f585342507e",
      "name": "Claws",
      "copiesInStack": 4,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
              "direction": 5,
              "initiativeModifier": 0
            },
            {
              "value": 1,
              "direction": 4,
              "initiativeModifier": 0
            }
          ]
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 3,
          "initiative": 3
        },
        {
          "type": 0,
          "toughness": 1,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "971632f1-fab7-428d-87e0-8f585342507e",
      "name": "Super mutant",
      "copiesInStack": 1,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
              "direction": 0,
              "initiativeModifier": 0
            },
            {
              "value": 1,
              "direction": 5,
              "initiativeModifier": 0
            },
            {
              "value": 1,
              "direction": 1,
              "initiativeModifier": 0
            }
          ]
        },
        {
          "type": 3,
          "directions": [
            0,
            5,
            1
          ]
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 2,
          "initiative": 2
        },
        {
          "type": 0,
          "toughness": 2,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "9648234e-bd0b-4f75-88ce-7488c0f241e4",
      "name": "Net fighter",
      "copiesInStack": 2,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 3,
              "direction": 0,
              "initiativeModifier": 0
            }
          ]
        },
        {
          "type": 5,
          "directions": [
            0
          ]
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 1,
          "initiative": 1
        },
        {
          "type": 0,
          "toughness": 1,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "2828aa42-fcaf-4fd1-be13-f551d5abb5c8",
      "name": "Brawler",
      "copiesInStack": 2,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 2,
              "direction": 0,
              "initiativeModifier": 0
            }
          ]
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 2,
          "initiative": 2
        },
        {
          "type": 0,
          "toughness": 1,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "27f1b80e-e2ba-4131-9031-765fa4f5ad81",
      "name": "Assasin",
      "copiesInStack": 2,
      "abilities": [
        {
          "type": 1,
          "attack": [
            {
              "value": 1,
              "direction": 5,
              "initiativeModifier": 0
            }
          ]
        },
        {
          "type": 8,
          "usingsPerRound": 1
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 3,
          "initiative": 3
        },
        {
          "type": 0,
          "toughness": 1,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "29d7cbea-84a6-43f1-b4d3-325e50a0bbe0",
      "name": "Medic",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "be4756ef-5da3-489a-85b1-cad9832c9d26",
      "name": "Officer",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "618b87ec-4516-4fb8-ab79-6bd8fd6a0e94",
      "name": "Super officer",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "8a81e036-b3fc-4f3e-bd98-97b6b31bf4a9",
      "name": "Scout",
      "copiesInStack": 2,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    }
  ],
  "headquarter": {
    "id": "80030423-5a49-435c-8649-f3570c2f6e9a",
    "name": "Borgo headquarter",
    "copiesInStack": 1,
    "abilities": [
      {
        "type": 0,
        "attack": [
          {
            "value": 1,
            "direction": 0,
            "initiativeModifier": 0
          },
          {
            "value": 1,
            "direction": 5,
            "initiativeModifier": 0
          },
          {
            "value": 1,
            "direction": 1,
            "initiativeModifier": 0
          },
          {
            "value": 1,
            "direction": 2,
            "initiativeModifier": 0
          },
          {
            "value": 1,
            "direction": 4,
            "initiativeModifier": 0
          },
          {
            "value": 1,
            "direction": 3,
            "initiativeModifier": 0
          }
        ]
      },
      {
        "type": 11,
        "modify": [
          {
            "value": 1,
            "direction": 0,
            "attribute": 1
          },
          {
            "value": 1,
            "direction": 5,
            "attribute": 1
          },
          {
            "value": 1,
            "direction": 1,
            "attribute": 1
          },
          {
            "value": 1,
            "direction": 2,
            "attribute": 1
          },
          {
            "value": 1,
            "direction": 4,
            "attribute": 1
          },
          {
            "value": 1,
            "direction": 3,
            "attribute": 1
          }
        ]
      }
    ],
    "attributes": [],
    "direction": 0,
    "type": "Unit"
  }
};




export const borgoGraphical = [
  {
    "id": "80030423-5a49-435c-8649-f3570c2f6e9a",
    "type": "Headquarter",
    "name": "Headquarter",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 0,
      "name": 21
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 23,
        "modifier": 1
      },
      {
        "slot": "te1",
        "symbol": 23,
        "modifier": 1
      },
      {
        "slot": "te2",
        "symbol": 23,
        "modifier": 1
      },
      {
        "slot": "te3",
        "symbol": 23,
        "modifier": 1
      },
      {
        "slot": "te4",
        "symbol": 23,
        "modifier": 1
      },
      {
        "slot": "te5",
        "symbol": 23,
        "modifier": 1
      },
      {
        "slot": "tc0",
        "symbol": 17,
        "modifier": 0
      },
      {
        "slot": "tc3",
        "symbol": 13,
        "modifier": 1
      }
    ]
  },
  {
    "id": "f51665bc-344e-4a12-a0c3-8eaaf876d1c2",
    "type": "Unit",
    "name": "Mutant",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 1,
      "name": "borgo_mutant"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "te5",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "te1",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "tc5",
        "symbol": 17,
        "modifier": 2
      }
    ]
  },
  {
    "id": "971632f1-fab7-428d-87e0-8f585342507e",
    "type": "Unit",
    "name": "Claws",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 1,
      "name": "borgo_claws"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "te5",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "tc3",
        "symbol": 17,
        "modifier": 3
      }
    ]
  },
  {
    "id": "971632f1-fab7-428d-87e0-8f585342507e",
    "type": "Unit",
    "name": "Super mutant",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 1,
      "name": "borgo_supermutant"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 3
      },
      {
        "slot": "te5",
        "symbol": 3
      },
      {
        "slot": "te1",
        "symbol": 3
      },
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 2
      },
      {
        "slot": "te5",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "te1",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "tc4",
        "symbol": 17,
        "modifier": 2
      },
      {
        "slot": "tc3",
        "symbol": 18,
        "modifier": 1
      }
    ]
  },
  {
    "id": "9648234e-bd0b-4f75-88ce-7488c0f241e4",
    "type": "Unit",
    "name": "Net fighter",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 1,
      "name": "borgo_netfighter"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 5
      },
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 3
      },
      {
        "slot": "tc4",
        "symbol": 17,
        "modifier": 1
      }
    ]
  },
  {
    "id": "2828aa42-fcaf-4fd1-be13-f551d5abb5c8",
    "type": "Unit",
    "name": "Brawler",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 1,
      "name": "borgo_brawler"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 2
      },
      {
        "slot": "tc4",
        "symbol": 17,
        "modifier": 2
      }
    ]
  },
  {
    "id": "27f1b80e-e2ba-4131-9031-765fa4f5ad81",
    "type": "Unit",
    "name": "Assasin",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 1,
      "name": "borgo_assasin"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 1,
        "modifier": 1
      },
      {
        "slot": "tc1",
        "symbol": 17,
        "modifier": 3
      },
      {
        "slot": "tc3",
        "symbol": 8,
        "modifier": 1
      }
    ]
  },
  {
    "id": "29d7cbea-84a6-43f1-b4d3-325e50a0bbe0",
    "type": "Module",
    "name": "Medic",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 19
      },
      {
        "slot": "te5",
        "symbol": 19
      },
      {
        "slot": "te1",
        "symbol": 19
      },
      {
        "slot": "ti0",
        "symbol": 14,
        "modifier": 1
      },
      {
        "slot": "tc3",
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "be4756ef-5da3-489a-85b1-cad9832c9d26",
    "type": "Module",
    "name": "officer",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 19
      },
      {
        "slot": "te5",
        "symbol": 19
      },
      {
        "slot": "te1",
        "symbol": 19
      },
      {
        "slot": "ti0",
        "symbol": 12,
        "modifier": 1
      },
      {
        "slot": "tc3",
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "618b87ec-4516-4fb8-ab79-6bd8fd6a0e94",
    "type": "Module",
    "name": "super officer",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 19,
        "modifier": 1
      },
      {
        "slot": "te5",
        "symbol": 19,
        "modifier": 1
      },
      {
        "slot": "te1",
        "symbol": 19,
        "modifier": 1
      },
      {
        "slot": "ti0",
        "symbol": 12,
        "modifier": 1
      },
      {
        "slot": "tc3",
        "symbol": 18,
        "modifier": 1
      },
      {
        "slot": "tc4",
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "8a81e036-b3fc-4f3e-bd98-97b6b31bf4a9",
    "type": "Module",
    "name": "scout",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 19,
        "modifier": 1
      },
      {
        "slot": "te5",
        "symbol": 19,
        "modifier": 1
      },
      {
        "slot": "te1",
        "symbol": 19,
        "modifier": 1
      },
      {
        "slot": "ti0",
        "symbol": 13,
        "modifier": 1
      },
      {
        "slot": "tc3",
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "e6a25993-e0f3-4d62-ab0a-849b5de6fb4c",
    "type": "InstantAction",
    "name": "Battle",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 0,
      "name": 9
    }
  },
  {
    "id": "6b11b757-0bb8-4666-9cc9-ea5d5c063612",
    "type": "InstantAction",
    "name": "Move",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 0,
      "name": 12
    }
  },
  {
    "id": "64e53835-e658-4bf6-8bbf-fa31c546e9cc",
    "type": "InstantAction",
    "name": "Granade",
    "colors": {
      "primary": "#30c2ff",
      "secondary": "#1a406b",
      "tertiary": "#0578fa"
    },
    "artwork": {
      "type": 0,
      "name": 8
    }
  }
]

