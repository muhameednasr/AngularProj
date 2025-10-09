import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WishlistService } from '../../shared/wishlist-service';
import { AuthService } from '../../auth/auth-service';
import { LanguageService, LangCode } from '../../shared/language-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  total$!: Observable<number>;
  isLoggedIn$!: Observable<boolean>;
  currentLang: string = 'EN'; 

  constructor(
    private wishlist: WishlistService,
    private auth: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.total$ = this.wishlist.total$;
    this.isLoggedIn$ = this.auth.isLoggedIn$;

    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang.toUpperCase(); 
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  setLanguage(code: LangCode) {
    this.languageService.setLanguage(code);
  }
}
