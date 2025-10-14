import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WishlistService } from '../../shared/wishlist-service';
import { AuthService } from '../../auth/auth-service';
import { LanguageService, LangCode } from '../../shared/language-service';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  total$!: Observable<number>;
  isLoggedIn$!: Observable<boolean>;
  currentLang: string = 'EN';
  isDark: boolean = false;

  constructor(
    private wishlist: WishlistService,
    private auth: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.total$ = this.wishlist.total$;
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    // Initialize header language display once; do NOT subscribe so header won't re-render on language changes
    try {
      const lang = this.languageService.getLanguage();
      this.currentLang = (lang || 'en').toUpperCase();
    } catch (e) {
      // ignore if document-less environment
    }

    // Initialize dark mode from localStorage and apply to document body
    try {
      const stored = localStorage.getItem('darkMode');
      this.isDark = stored === 'true';
      if (this.isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    } catch (e) {
      // ignore (e.g., SSR or restricted environment)
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  setLanguage(code: LangCode) {
    this.languageService.setLanguage(code);
    this.currentLang = code.toUpperCase();
  }

  toggleDarkMode() {
    try {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    } catch (e) {
      // ignore localStorage/document errors
    }
  }
}
