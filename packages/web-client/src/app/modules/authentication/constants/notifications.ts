import { ICONS } from 'src/app/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType, SystemNotification } from '../../notifications/models/notification';

export const notifications = {
  error: new SystemNotification({
    type: NotificationType.Error,
    icon: ICONS.warning,
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  success: new SystemNotification({
    type: NotificationType.Success,
    icon: ICONS.success,
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  badCredentials: new SystemNotification({
    type: NotificationType.Error,
    icon: ICONS.login,
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  })
};

export type AuthNotifications = typeof notifications;
export const NotificationsToken = new InjectionToken<AuthNotifications>('auth.notifications');
  