import { Injectable } from '@angular/core';
import { ArmyBadge } from 'src/app/modules/game-modes/models/army';
import { MyProfile } from 'src/app/modules/my-profile/models/profile';
import { GameData } from '../../models/game-data';

export interface OfflineGameplayFeed {
  badges: ArmyBadge[];
  myProfile: MyProfile,
  gameData: GameData
}

@Injectable({
  providedIn: 'root'
})
export class OfflineGameplayService {
  constructor() { }
}
