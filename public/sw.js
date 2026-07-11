self.addEventListener('push', (event) => {
  let data = { title: 'New Notification', body: '', url: '/' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'New Notification', body: event.data.text(), url: '/' };
    }
  }

  // Handle cross-device dismiss notification events
  if (data.type === 'dismiss' || data.title === 'dismiss' || data.type === 'end_call') {
    event.waitUntil(
      self.registration.getNotifications().then((notifications) => {
        let closedAny = false;
        notifications.forEach((notification) => {
          const notifData = notification.data || {};
          const notifUrl = notifData.url || '';
          const targetUrl = data.url || '';
          if (notifUrl && targetUrl && notifUrl.includes(targetUrl)) {
            notification.close();
            closedAny = true;
          }
        });
        
        // If it is just a push dismiss notification, return immediately without showing anything
        if (data.type === 'dismiss' || data.title === 'dismiss') {
          return;
        }

        if (closedAny) {
          return self.registration.showNotification('Call ended', {
            body: 'The active call has finished.',
            icon: '/pookiz-logo.png',
            badge: '/pookiz-logo.png',
            tag: 'call_ended',
          });
        } else {
          return self.registration.showNotification('Pookiz', {
            body: 'Call ended on another device.',
            icon: '/pookiz-logo.png',
            badge: '/pookiz-logo.png',
            tag: 'call_sync',
          }).then(() => {
            // Self-close the call sync notification after 1 second if possible
            setTimeout(() => {
              self.registration.getNotifications({ tag: 'call_sync' }).then((notifs) => {
                notifs.forEach(n => n.close());
              });
            }, 1000);
          });
        }
      })
    );
    return;
  }

  const options = {
    body: data.body,
    icon: '/pookiz-logo.png',
    badge: '/pookiz-logo.png',
    silent: false,
    data: {
      url: data.url || '/'
    }
  };

  // Enhance options for active incoming calls
  if (data.type === 'incoming_call' || data.ring) {
    options.tag = data.roomName || 'incoming_call';
    options.renotify = true;
    options.requireInteraction = true;
    options.vibrate = [500, 250, 500, 250, 500, 250, 500, 250];
    options.sound = '/ringtone_call.mp3';
    options.actions = [
      {
        action: 'accept',
        title: 'Accept',
      },
      {
        action: 'decline',
        title: 'Decline',
      }
    ];
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'decline') {
    // If recipient declines from push banner, do not proceed with navigation
    return;
  }

  const targetUrl = new URL(event.notification.data.url || '/', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 1. Focus if matching window is already open
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      
      // 2. Otherwise navigate any existing app window if possible
      for (const client of clientList) {
        if ('navigate' in client && 'focus' in client) {
          return client.navigate(targetUrl).then((c) => c.focus());
        }
      }

      // 3. Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
