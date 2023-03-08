import { GameMode } from "@hexchess-game-logic/lib/features/game/models/game-configuration";
import { IGameMode } from "../models/game-mode";

export const gameModes: IGameMode[] = [
  {
    id: 1,
    configuration: {
      gameMode: GameMode.Skirmish,
      playersNumber: 2,
      isOnline: true
    },
    name: 'Duel Quickmatch',
    description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
    image: './assets/images/duel.jpg'
  },
  {
    id: 2,
    configuration: {
      gameMode: GameMode.Skirmish,
      playersNumber: 3,
      isOnline: true
    },
    name: 'Triple Quickmatch',
    description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
    image: './assets/images/triple.jpg'
  },
  {
    id: 3,
    configuration: {
      gameMode: GameMode.Skirmish,
      playersNumber: 4,
      isOnline: true
    },
    name: 'Quad Quickmatch',
    description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
    image: './assets/images/quad.jpg'
  },
  {
    id: 4,
    configuration: {
      gameMode: GameMode.Skirmish,
      playersNumber: 2,
      isOnline: false
    },
    name: 'Create Hotseat Game',
    description: 'Suspendisse nunc velit, dictum a lacus non, facilisis pulvinar libero. Curabitur odio ante, consequat nec felis vitae, dapibus dictum ligula. Ut faucibus porta velit ut mollis.',
    image: './assets/images/custom.jpg'
  }
]