import { useCallback } from 'react';

export const useNotifications = () => {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  const sendLocalNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/logo.png',
        ...options,
      });
    }
  }, []);

  return { requestPermission, sendLocalNotification };
};
