import { Component, inject } from '@angular/core';
import { UserService } from '../../auth/user-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
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
  submitForm() {
    for (var user of this.users.getUsers()) {
      if (user.email == this.loginData.email && user.password == this.loginData.password) {
        this.auth.login();
        alert('logged in successfully');
        this.router.navigate(['/']);
        return;
      }
    }

    alert('Invalid Email or Password');
  }
}
