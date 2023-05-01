import { Inject, Injectable } from "@angular/core";
import { Notification } from "../../../aspects/notifications/api";
import { ArmyNotifications, ArmyNotificationsToken } from "../constants/army-notifications";
import { IArmyAssignmentDto } from "../models/army-assignment.dto";
import { ArmiesService } from "./armies.service";
import { lastValueFrom } from 'rxjs';
import { IArmyBadge } from "../api";


@Injectable({ providedIn: 'root' })
export class ArmiesNotificationsFactory {
  
  constructor(
    @Inject(ArmyNotificationsToken) private readonly _notifications: ArmyNotifications,
    private readonly _armiesService: ArmiesService
  ) {}

  public async createSuccessNotification(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): Promise<Notification> {
    const badges = await lastValueFrom(this._armiesService.getArmyBadges());

    const swap = this._getSwapedArmies(initial, target);
    if (swap.initial && swap.target) 
      return this._getArmyUpdatedNotification(swap.initial, swap.target, badges);

    const added = this._getAddedArmy(initial, target);
    if (added)
      return this._getArmyAddedNotification(added, badges);

    const removed = this._getRemovedArmy(initial, target);
    if (removed)
      return this._getArmyRemovedNotification(removed, badges);
  }

  public createFailureNotification(): Notification {
    return new Notification(this._notifications.selectedArmyAdded);
  }

  private _getArmyUpdatedNotification(prev: IArmyAssignmentDto, curr: IArmyAssignmentDto, badges: IArmyBadge[]): Notification {
    const notify = new Notification(this._notifications.selectedArmyAdded);
    const prevArmyName = badges.find(b => b.armyId === prev.armyId)?.name;
    const currArmyName = badges.find(b => b.armyId === curr.armyId)?.name;
    notify.content += notify.content + prevArmyName + currArmyName;
    return notify;
  }

  private _getArmyAddedNotification(army: IArmyAssignmentDto, badges: IArmyBadge[]): Notification {
    const notify = new Notification(this._notifications.selectedArmyAdded);
    const armyName = badges.find(b => b.armyId === army.armyId)?.name;
    notify.content + armyName;
    return notify;
  }

  private _getArmyRemovedNotification(army: IArmyAssignmentDto, badges: IArmyBadge[]): Notification {
    const notify = new Notification(this._notifications.selectedArmyRemoved);
    const armyName = badges.find(b => b.armyId === army.armyId)?.name;
    notify.content + armyName;
    return notify;
  }

  private _getRandomArmyNotification(): Notification {
    return new Notification(this._notifications.randomArmySetted);
  }

  private _getSwapedArmies(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): { initial: IArmyAssignmentDto; target: IArmyAssignmentDto; } {
    const isMissingPriority = initial.concat(target).map(a => a.armyId).some(id => id === null);
    if (isMissingPriority) throw new Error();

    const targetArmy = target.find(ta => initial.some(ia => ia?.armyId !== ta?.armyId));
    return {
      initial: initial.length === 1 ? initial[0] : initial.find(a => a?.priority === targetArmy?.priority),
      target: targetArmy
    }
  }

  private _getAddedArmy(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): IArmyAssignmentDto {
    return target.find(ta => initial.some(ia => ia.priority !== ta.priority) || initial.length == 0);
  }

  private _getRemovedArmy(initial: IArmyAssignmentDto[], target: IArmyAssignmentDto[]): IArmyAssignmentDto {
    return initial.find(ta => target.some(ia => ia.priority !== ta.priority) || target.length == 0);
  }


} 