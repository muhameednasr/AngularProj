import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private KEY = 'is_logged_in';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) === 'true';
  }

  login(username: string) {
    localStorage.setItem(this.KEY, 'true');
    localStorage.setItem('current_user', username);
  }

  logout() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem('current_user');
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('current_user');
  }
}
