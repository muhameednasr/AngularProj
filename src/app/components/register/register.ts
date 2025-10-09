import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../auth/user-service';
import { AuthService } from '../../auth/auth-service';
import { NotificationService } from '../../shared/notification.service';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  name = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  private userService = inject(UserService);
  private auth = inject(AuthService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.notify.show('Please fill all required fields', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.notify.show('Password and Confirm Password must match', 'error');
      return;
    }

    const user: Iuser = {
      username: this.username || this.email,
      email: this.email,
      password: this.password,
      wishlist: [],
    };

    this.userService.addUser(user);
    this.auth.register(user);
    this.notify.show('Account created successfully!', 'success');
    setTimeout(() => this.router.navigateByUrl('/login'), 1000);
  }
}

