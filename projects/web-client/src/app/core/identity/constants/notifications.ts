import { ICONS } from 'src/app/shared/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType, Notification } from '../../../aspects/notifications/api';


export const IDENTITY_NOTIFICATIONS = {
  error: new Notification({
    type: NotificationType.Error,
    icon: ICONS.warning,
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  success: new Notification({
    type: NotificationType.Success,
    icon: ICONS.success,
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  badCredentials: new Notification({
    type: NotificationType.Error,
    icon: ICONS.login,
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  })
};

export type IdentityNotifications = typeof IDENTITY_NOTIFICATIONS;
export const IdentityNotificationsToken = new InjectionToken<IdentityNotifications>('identity-notifications');
  