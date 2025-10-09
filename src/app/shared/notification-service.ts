import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notify(message: string) {
    try {
      console.log(`[Notification] ${message}`);
    } catch (e) {
      // noop
    }
  }
}
