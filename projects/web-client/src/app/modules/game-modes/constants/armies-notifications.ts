
import { ICONS } from 'src/app/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType } from '../models/armies-notification';



export const notifications = {
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

export type ArmiesNotifications = typeof notifications;
export const NotificationsToken = new InjectionToken<ArmiesNotifications>('armies.notifications');
  