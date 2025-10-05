import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
     users: Iuser[] = [];

  addUser(user: Iuser) {
    this.users.push(user);
  }

  getUsers(): Iuser[] {
    return this.users;
  }
}
