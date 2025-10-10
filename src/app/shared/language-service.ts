import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification-service';

export type LangCode = 'en' | 'ar' | 'fr' | 'zh';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _lang$ = new BehaviorSubject<LangCode>('en');
  readonly currentLanguage$ = this._lang$.asObservable();

  constructor(private notifier: NotificationService) {}

  getLanguage(): LangCode {
    return this._lang$.value;
  }

  private mapToTmdb(code: LangCode): string {
    switch (code) {
      case 'en':
        return 'en-US';
      case 'fr':
        return 'fr-FR';
      case 'zh':
        return 'zh-CN';
      case 'ar':
        return 'ar';
      default:
        return 'en-US';
    }
  }

  // returns TMDB-ready language string
  getTmdbLanguage(code?: LangCode): string {
    const c = code ?? this.getLanguage();
    return this.mapToTmdb(c);
  }

  setLanguage(code: LangCode) {
    this._lang$.next(code);
    // update document direction for Arabic
    if (typeof document !== 'undefined') {
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    }
    try {
      this.notifier.notify(`Language changed to ${code}`);
    } catch (e) {
      // ignore
    }
  }
}
