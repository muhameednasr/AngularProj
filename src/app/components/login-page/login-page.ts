import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-Page.html',
  styleUrls: ['./login-Page.css']
})
export class LoginPage {
  username = '';
  password = '';
  error = '';
  returnUrl = '/';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const q = this.route.snapshot.queryParamMap.get('returnUrl');
    if (q) this.returnUrl = q;
  }
onSubmit() {
  if (!this.username || !this.password) {
    this.error = 'please enter username and password';
    return;
  }

  this.auth.login(this.username); // save username and login

// redirect to returnUrl or default to home
  const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  this.router.navigateByUrl(returnUrl);
}

}
