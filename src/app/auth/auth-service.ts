import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: Iuser | null = null;
  private _auth$ = new BehaviorSubject<boolean>(this.loggedIn);
  readonly isLoggedIn$ = this._auth$.asObservable();

  constructor() {
    // initialize from localStorage if present
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        this.currentUser = JSON.parse(raw) as Iuser;
        this.loggedIn = true;
        this._auth$.next(true);
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  get user(): Iuser | null {
    return this.currentUser;
  }

  // login using a user object (persist to localStorage)
  login(user: Iuser) {
    this.currentUser = user;
    this.loggedIn = true;
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch {}
    this._auth$.next(true);
  }

  // register is simply login + persist; user storage should be handled by UserService
  register(user: Iuser) {
    this.login(user);
  }

  logout() {
    this.currentUser = null;
    this.loggedIn = false;
    localStorage.removeItem('user');
    this._auth$.next(false);
  }
}
