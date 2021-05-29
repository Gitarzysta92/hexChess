
import { ICONS } from 'src/app/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType, SystemNotification } from '../models/notification';

export const notifications = {
  warning: new SystemNotification({
    type: NotificationType.Warning,
    icon: ICONS.warning,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  success: new SystemNotification({
    type: NotificationType.Success,
    icon: ICONS.success,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  badCredentials: new SystemNotification({
    type: NotificationType.Error,
    icon: ICONS.error,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  error: new SystemNotification({
    type: NotificationType.Error,
    icon: ICONS.error,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  }),
  information: new SystemNotification({
    type: NotificationType.Default,
    icon: ICONS.comment,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  })
};

export type AuthNotifications = typeof notifications;
export const NotificationsToken = new InjectionToken<AuthNotifications>('auth.notifications');
  