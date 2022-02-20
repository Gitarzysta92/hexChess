
import { ICONS } from 'src/app/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType } from '../models/notification';

export const notifications = {
  warning: {
    type: NotificationType.Warning,
    icon: ICONS.warning,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`,
  },
  httpError: {
    type: NotificationType.Error,
    icon: ICONS.error,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`,
  },
};

export type SystemNotifications = typeof notifications;
export const SystemNotificationsToken = new InjectionToken<SystemNotifications>('system.notifications');
  