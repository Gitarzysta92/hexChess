export const hegemony = {
  "id": "937ad7d2-deff-4203-9ec0-290b30e6eaa3",
  "name": "Hegemony",
  "colors": {
    "outer": '#edb316',
    "inner": '#ab4a03',
    "stroke": '#ff7404'
  },
  "icon": 'hegemony',
  "tiles": [
    {
      "id": "f7d202ae-3257-4f5c-8bd9-e7f40b291be1",
      "name": "Sniper",
      "actions": [
        {
          "type": "ModifyAttribute",
          "attribute": 0,
          "targetType": 0,
          "value": -1
        }
      ],
      "copiesInStack": 1,
      "type": "InstantAction"
    },
    {
      "id": "8410f971-82be-47c0-b016-49123b928be2",
      "name": "Move",
      "actions": [
        {
          "type": "Move",
          "targetType": 0,
          "value": 1
        }
      ],
      "copiesInStack": 3,
      "type": "InstantAction"
    },
    {
      "id": "dfc22002-6121-4e76-b20a-0239740014ac",
      "name": "Battle",
      "actions": [
        {
          "type": "Battle",
          "targetType": 2
        }
      ],
      "copiesInStack": 5,
      "type": "InstantAction"
    },
    {
      "id": "52329582-835a-4e27-bf38-cdf88fc90e5e",
      "name": "Push back",
      "actions": [
        {
          "type": "Push",
          "targetType": 0
        }
      ],
      "copiesInStack": 2,
      "type": "InstantAction"
    },
    {
      "id": "1d0f7d68-8650-4c5d-b2e4-98ee2c40d230",
      "name": "Runner",
      "copiesInStack": 3,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
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
      "id": "44e5a3ec-735a-4196-a86f-0b63a60b1414",
      "name": "Thug",
      "copiesInStack": 3,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 2,
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
      "id": "1c727430-85bf-4078-89ef-838db4c5d84c",
      "name": "Ganger",
      "copiesInStack": 4,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
              "direction": 5,
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
          "baseInitiative": 3,
          "initiative": 3
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
      "id": "3c3cd958-98dd-4798-9a8c-d5ffce1c9b1f",
      "name": "Gladiator",
      "copiesInStack": 1,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 2,
              "direction": 0,
              "initiativeModifier": 0
            },
            {
              "value": 2,
              "direction": 5,
              "initiativeModifier": 0
            },
            {
              "value": 2,
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
          "baseInitiative": 1,
          "initiative": 1
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
      "id": "d69d0a79-9a27-474e-89f0-23bbfbb2700f",
      "name": "Net Fighet",
      "copiesInStack": 2,
      "abilities": [
        {
          "type": 5,
          "directions": [
            1
          ]
        }
      ],
      "attributes": [
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
      "id": "1f8165fc-3c93-44cd-81a1-05d1f634b760",
      "name": "Net Master",
      "copiesInStack": 1,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
              "direction": 3,
              "initiativeModifier": 0
            }
          ]
        },
        {
          "type": 5,
          "directions": [
            4,
            2
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
      "id": "1ce351ed-fc6e-486d-ac5f-c2b8797786e0",
      "name": "Guard",
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
              "direction": 3,
              "initiativeModifier": 0
            }
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
          "toughness": 2,
          "wounds": 0
        }
      ],
      "direction": 0,
      "type": "Unit"
    },
    {
      "id": "503e9d2b-0ae8-44a1-9bbe-971b33fb93fb",
      "name": "Universal Soldier",
      "copiesInStack": 3,
      "abilities": [
        {
          "type": 0,
          "attack": [
            {
              "value": 1,
              "direction": 5,
              "initiativeModifier": 0
            }
          ]
        },
        {
          "type": 1,
          "attack": [
            {
              "value": 1,
              "direction": 5,
              "initiativeModifier": 0
            }
          ]
        }
      ],
      "attributes": [
        {
          "type": 1,
          "baseInitiative": 3,
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
      "id": "2e552e29-31fc-4c11-9e65-a2056a70b511",
      "name": "The Boss",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "be4756ef-5da3-489a-85b1-cad9832c9d26",
      "name": "Officer",
      "copiesInStack": 2,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "3224c8c3-8dd5-4123-92cc-b2064f673298",
      "name": "Officer II",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "b51fc615-faa6-4c8c-9046-c627a53b0148",
      "name": "Scout",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "b36398ad-d219-4456-b2c4-3c1160ec9bcc",
      "name": "Transport",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    },
    {
      "id": "58d2e19d-b032-4e39-9eeb-7b174ec4a11d",
      "name": "Quartermaster",
      "copiesInStack": 1,
      "abilities": [],
      "attributes": [],
      "type": "Module"
    }
  ],
  "headquarter": {
    "id": "e467d0c7-b0f7-466c-aa76-d856ab87dd2c",
    "name": "Hegemony headquarter",
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
        "type": 12,
        "modify": [
          {
            "value": 1,
            "attackType": 0,
            "direction": 0
          },
          {
            "value": 1,
            "attackType": 0,
            "direction": 5
          },
          {
            "value": 1,
            "attackType": 0,
            "direction": 1
          },
          {
            "value": 1,
            "attackType": 0,
            "direction": 2
          },
          {
            "value": 1,
            "attackType": 0,
            "direction": 4
          },
          {
            "value": 1,
            "attackType": 0,
            "direction": 3
          }
        ]
      }
    ],
    "attributes": [],
    "direction": 0,
    "type": "Unit"
  }
}



export const hegemonyGraphical = [
  {
    "id": "e467d0c7-b0f7-466c-aa76-d856ab87dd2c",
    "type": "Headquarter",
    "name": "Headquarter",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 0,
      "name": 22
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
        "symbol": 12,
        "modifier": 1
      }
    ]
  },
  {
    "id": "1d0f7d68-8650-4c5d-b2e4-98ee2c40d230",
    "type": "Unit",
    "name": "Runner",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_runner"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "tc0",
        "symbol": 17,
        "modifier": 2
      },
      {
        "slot": "tc5",
        "symbol": 8,
        "modifier": 1
      }
    ]
  },
  {
    "id": "44e5a3ec-735a-4196-a86f-0b63a60b1414",
    "type": "Unit",
    "name": "Thug",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_thug"
    },
    "slots": [
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
        "slot": "tc3",
        "symbol": 17,
        "modifier": 2
      }
    ]
  },
  {
    "id": "1c727430-85bf-4078-89ef-838db4c5d84c",
    "type": "Unit",
    "name": "Ganger",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_ganger"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "tc0",
        "symbol": 17,
        "modifier": 3
      }
    ]
  },
  {
    "id": "3c3cd958-98dd-4798-9a8c-d5ffce1c9b1f",
    "type": "Unit",
    "name": "Gladiator",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_gladiator"
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
        "modifier": 2
      },
      {
        "slot": "te1",
        "symbol": 0,
        "modifier": 2
      },
      {
        "slot": "tc4",
        "symbol": 17,
        "modifier": 1
      },
      {
        "slot": "tc3",
        "symbol": 18,
        "modifier": 1
      }
    ]
  },
  {
    "id": "d69d0a79-9a27-474e-89f0-23bbfbb2700f",
    "type": "Unit",
    "name": "Net fighter",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_netfighter"
    },
    "slots": [
      {
        "slot": "te5",
        "symbol": 5
      },
      {
        "slot": "tc5",
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "1f8165fc-3c93-44cd-81a1-05d1f634b760",
    "type": "Unit",
    "name": "Net master",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_netmaster"
    },
    "slots": [
      {
        "slot": "te5",
        "symbol": 5
      },
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "te1",
        "symbol": 5
      },
      {
        "slot": "tc4",
        "symbol": 17,
        "modifier": 2
      }
    ]
  },
  {
    "id": "1ce351ed-fc6e-486d-ac5f-c2b8797786e0",
    "type": "Unit",
    "name": "Guard",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_guard"
    },
    "slots": [
      {
        "slot": "te5",
        "symbol": 0,
        "modfier": 1
      },
      {
        "slot": "te0",
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
    "id": "503e9d2b-0ae8-44a1-9bbe-971b33fb93fb",
    "type": "Unit",
    "name": "Universal soldier",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 1,
      "name": "hegemony_universalsoldier"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 1,
        "modifier": 1
      },
      {
        "slot": "te0",
        "symbol": 0,
        "modifier": 1
      },
      {
        "slot": "tc0",
        "symbol": 17,
        "modifier": 3
      }
    ]
  },
  {
    "id": "2e552e29-31fc-4c11-9e65-a2056a70b511",
    "type": "Module",
    "name": "The Boss",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
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
        "slot": "ti0",
        "symbol": 12,
        "modifier": 1
      },
      {
        "slot": "ti0",
        "symbol": 13,
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
    "id": "be4756ef-5da3-489a-85b1-cad9832c9d26",
    "type": "Module",
    "name": "officer1",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
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
    "id": "3224c8c3-8dd5-4123-92cc-b2064f673298",
    "type": "Module",
    "name": "officer2",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
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
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "b51fc615-faa6-4c8c-9046-c627a53b0148",
    "type": "Module",
    "name": "scout",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
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
    "id": "b36398ad-d219-4456-b2c4-3c1160ec9bcc",
    "type": "Module",
    "name": "transport",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
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
        "slot": "te3",
        "symbol": 19
      },
      {
        "slot": "te2",
        "symbol": 19
      },
      {
        "slot": "te4",
        "symbol": 19
      },
      {
        "slot": "ti0",
        "symbol": 20,
        "modifier": 1
      },
      {
        "slot": "tc1",
        "symbol": 22,
        "modifier": 1
      }
    ]
  },
  {
    "id": "58d2e19d-b032-4e39-9eeb-7b174ec4a11d",
    "type": "Module",
    "name": "quartermaster",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "slots": [
      {
        "slot": "te0",
        "symbol": 19
      },
      {
        "slot": "ti0",
        "symbol": 21,
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
    "id": "dfc22002-6121-4e76-b20a-0239740014ac",
    "type": "InstantAction",
    "name": "Battle",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 0,
      "name": 9
    }
  },
  {
    "id": "8410f971-82be-47c0-b016-49123b928be2",
    "type": "InstantAction",
    "name": "Move",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 0,
      "name": 12
    }
  },
  {
    "id": "f7d202ae-3257-4f5c-8bd9-e7f40b291be1",
    "type": "InstantAction",
    "name": "Sniper",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 0,
      "name": 15
    }
  },
  {
    "id": "52329582-835a-4e27-bf38-cdf88fc90e5e",
    "type": "InstantAction",
    "name": "Pushback",
    "colors": {
      "primary": "#edb316",
      "secondary": "#ff7404",
      "tertiary": "#ab4a03"
    },
    "artwork": {
      "type": 0,
      "name": 13
    }
  }
]