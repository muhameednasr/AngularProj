import { Component, inject } from '@angular/core';
import { UserService } from '../../auth/user-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  //Template Form
  loginData = {
    email: '',
    password: '',
  };

  users = inject(UserService);
  auth = inject(AuthService);
  router = inject(Router);
  notify = inject(NotificationService);
  submitForm() {
    for (var user of this.users.getUsers()) {
      if (user.email == this.loginData.email && user.password == this.loginData.password) {
        this.auth.login(user);
        this.notify.show('Logged in successfully', 'success');
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get('returnUrl') || '/';
        // navigate back to the attempted URL or home
        this.router.navigateByUrl(returnUrl);
        return;
      }
    }

    this.notify.show('Invalid Email or Password', 'error');
  }
}
