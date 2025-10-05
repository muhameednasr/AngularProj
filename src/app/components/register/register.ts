import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../auth/user-service';
import { Iuser } from '../../models/iuser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
user: Iuser[] = [];

  loginForm: FormGroup;
  router = inject(Router);
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z0-9._]{3,16}$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  submitFormData() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const user:Iuser={username: formData.username,
        email: formData.email,
        password: formData.password,wishlist:[]}
      this.userService.addUser( user);
      this.router.navigate(['/']);
    }
    alert(this.loginForm.get('name')?.value + ' added successfully');
    console.log(this.loginForm.get('name')?.value + ' added successfully');
  }

  get nameCtrl(): FormControl {
    return <FormControl>this.loginForm.get('name');
  }

  get usernameCtrl(): FormControl {
    return <FormControl>this.loginForm.get('username');
  }

  get emailCtrl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordCtrl(): FormControl {
    return <FormControl>this.loginForm.get('password');
  }
  get confirmPasswordCtrl(): FormControl {
    return <FormControl>this.loginForm.get('confirmPassword');
  }
}
function passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

