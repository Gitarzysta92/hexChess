import { Inject, Injectable } from "@angular/core";
import { ArmiesNotifications, NotificationsToken } from "../../constants/armies-notifications";
import { ArmiesNotification } from "../../models/armies-notification";
import { MySelectedArmy } from "../../models/army";

interface SwapedArmies {
  initial: MySelectedArmy;
  target: MySelectedArmy;
}


@Injectable({ providedIn: 'root' })
export class ArmiesNotificationsFactory {
  
  constructor(
    @Inject(NotificationsToken) private readonly _notifications: ArmiesNotifications,
  ) {}

  public createSuccessNotification(initial: MySelectedArmy[], target: MySelectedArmy[]): ArmiesNotification {
  
    if (target.length === 0)
      return this._getRandomArmyNotification();

    const swap = this._getSwapedArmies(initial, target);
    if (swap.initial && swap.target) 
      return this._getArmyUpdatedNotification(swap.initial, swap.target);

    const added = this._getAddedArmy(initial, target);
    if (added)
      return this._getArmyAddedNotification(added);

    const removed = this._getRemovedArmy(initial, target);
    if (removed)
      return this._getArmyRemovedNotification(removed);

  }

  private _getArmyUpdatedNotification(prev: MySelectedArmy, curr: MySelectedArmy): ArmiesNotification {
    const notify = new ArmiesNotification(this._notifications.selectedArmyAdded);
    const prevArmyName = prev.armyName;
    const currArmyName = curr.armyName;
    notify.content += notify.content + prevArmyName + currArmyName;
    return notify;
  }

  private _getArmyAddedNotification(army: MySelectedArmy): ArmiesNotification {
    const notify = new ArmiesNotification(this._notifications.selectedArmyAdded);
    const armyName = army.armyName;
    notify.content + armyName;
    return notify;
  }

  private _getArmyRemovedNotification(army: MySelectedArmy): ArmiesNotification {
    const notify = new ArmiesNotification(this._notifications.selectedArmyRemoved);
    const armyName = army.armyName;
    notify.content + armyName;
    return notify;
  }

  private _getRandomArmyNotification(): ArmiesNotification {
    return new ArmiesNotification(this._notifications.rendomArmySetted);
  }

  private _getSwapedArmies(initial: MySelectedArmy[], target: MySelectedArmy[]): SwapedArmies {
    const isMissingPriority = initial.concat(target).map(a => a.armyId).some(id => id === null);
    if (isMissingPriority) throw new Error();

    const targetArmy = target.find(ta => initial.some(ia => ia.armyId !== ta.armyId));
    return {
      initial: initial.find(a => a.priority === targetArmy.priority),
      target: targetArmy
    }
  }

  private _getAddedArmy(initial: MySelectedArmy[], target: MySelectedArmy[]): MySelectedArmy {
    return target.find(ta => initial.some(ia => ia.priority !== ta.priority));
  }

  private _getRemovedArmy(initial: MySelectedArmy[], target: MySelectedArmy[]): MySelectedArmy {
    return initial.find(ta => target.some(ia => ia.priority !== ta.priority));
  }


} 