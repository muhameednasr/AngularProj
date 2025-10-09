import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Iuser[] = [];

  constructor() {
    const raw = localStorage.getItem('users');
    if (raw) {
      try {
        this.users = JSON.parse(raw) as Iuser[];
      } catch {
        this.users = [];
        localStorage.removeItem('users');
      }
    }
  }

  private save() {
    try {
      localStorage.setItem('users', JSON.stringify(this.users));
    } catch {}
  }

  addUser(user: Iuser) {
    this.users.push(user);
    this.save();
  }

  getUsers(): Iuser[] {
    return this.users;
  }

  getByEmail(email: string): Iuser | undefined {
    return this.users.find((u) => u.email === email);
  }

  removeUser(email: string) {
    this.users = this.users.filter((u) => u.email !== email);
    this.save();
  }
}
