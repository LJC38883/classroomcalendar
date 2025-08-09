export class NotificationManager {
  private permission: NotificationPermission = 'default';

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.permission = 'granted';
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    }

    return false;
  }

  async scheduleNotification(
    title: string,
    body: string,
    delayMinutes: number,
    classId?: string
  ): Promise<void> {
    if (this.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    // Schedule the notification
    setTimeout(() => {
      this.showNotification(title, body, classId);
    }, delayMinutes * 60 * 1000);

    // Store in localStorage for persistence
    const notifications = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
    notifications.push({
      title,
      body,
      scheduledFor: new Date(Date.now() + delayMinutes * 60 * 1000).toISOString(),
      classId
    });
    localStorage.setItem('scheduled_notifications', JSON.stringify(notifications));
  }

  private showNotification(title: string, body: string, classId?: string): void {
    const notification = new Notification(title, {
      body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      tag: classId || 'class-reminder',
      requireInteraction: true,
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }

  cancelNotification(classId: string): void {
    // Remove from localStorage
    const notifications = JSON.parse(localStorage.getItem('scheduled_notifications') || '[]');
    const filtered = notifications.filter((n: any) => n.classId !== classId);
    localStorage.setItem('scheduled_notifications', JSON.stringify(filtered));
  }

  async testNotification(): Promise<void> {
    await this.requestPermission();
    if (this.permission === 'granted') {
      this.showNotification(
        '🎓 Test Notification',
        'Your notifications are working! You\'ll receive reminders before your classes.',
        undefined
      );
    }
  }
}
