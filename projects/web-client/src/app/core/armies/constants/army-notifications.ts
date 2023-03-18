
import { ICONS } from 'src/app/shared/icons/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType } from '../../../aspects/notifications/api';


export const ARMY_NOTIFICATIONS = {
  selectedArmyAdded: {
    type: NotificationType.Success,
    icon: ICONS.success,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  },
  selectedArmyRemoved: {
    type: NotificationType.Success,
    icon: ICONS.success,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  },
  rendomArmySetted: {
    type: NotificationType.Warning,
    icon: ICONS.warning,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  },
};

export type ArmyNotifications = typeof ARMY_NOTIFICATIONS;
export const ArmyNotificationsToken = new InjectionToken<ArmyNotifications>('army-notifications');
  