import { Inject, Injectable } from "@angular/core";
import { Notification } from "../../../aspects/notifications/api";
import { ArmyNotifications, ArmyNotificationsToken } from "../constants/army-notifications";
import { IArmyAssignmentDto } from "../models/army-assignment.dto";

@Injectable({ providedIn: 'root' })
export class ArmiesNotificationsFactory {
  
  constructor(
    @Inject(ArmyNotificationsToken) private readonly _notifications: ArmyNotifications,
  ) {}

  public createSuccessNotification(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): Notification {
  
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

  private _getArmyUpdatedNotification(prev: IArmyAssignmentDto, curr: IArmyAssignmentDto): Notification {
    const notify = new Notification(this._notifications.selectedArmyAdded);
    const prevArmyName = prev.army.name;
    const currArmyName = curr.army.name;
    notify.content += notify.content + prevArmyName + currArmyName;
    return notify;
  }

  private _getArmyAddedNotification(army: IArmyAssignmentDto): Notification {
    const notify = new Notification(this._notifications.selectedArmyAdded);
    const armyName = army.army.name;
    notify.content + armyName;
    return notify;
  }

  private _getArmyRemovedNotification(army: IArmyAssignmentDto): Notification {
    const notify = new Notification(this._notifications.selectedArmyRemoved);
    const armyName = army.army.name;
    notify.content + armyName;
    return notify;
  }

  private _getRandomArmyNotification(): Notification {
    return new Notification(this._notifications.rendomArmySetted);
  }

  private _getSwapedArmies(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): { initial: IArmyAssignmentDto; target: IArmyAssignmentDto; } {
    const isMissingPriority = initial.concat(target).map(a => a.army.id).some(id => id === null);
    if (isMissingPriority) throw new Error();

    const targetArmy = target.find(ta => initial.some(ia => ia.army.id !== ta.army.id));
    return {
      initial: initial.find(a => a.priority === targetArmy.priority),
      target: targetArmy
    }
  }

  private _getAddedArmy(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): IArmyAssignmentDto {
    return target.find(ta => initial.some(ia => ia.priority !== ta.priority));
  }

  private _getRemovedArmy(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): IArmyAssignmentDto {
    return initial.find(ta => target.some(ia => ia.priority !== ta.priority));
  }


} 