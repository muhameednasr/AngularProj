import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../auth/user-service';
import { Iuser } from '../../models/iuser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ هنا التعديل الأساسي
  templateUrl: './register.html',
  styleUrl: './register.css',
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
      const user: Iuser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        wishlist: [],
      };
      this.userService.addUser(user);
      alert(`${this.loginForm.get('name')?.value} added successfully`);
      this.router.navigate(['/']);
    }
  }

  get nameCtrl(): FormControl {
    return this.loginForm.get('name') as FormControl;
  }

  get usernameCtrl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get emailCtrl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordCtrl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get confirmPasswordCtrl(): FormControl {
    return this.loginForm.get('confirmPassword') as FormControl;
  }
}

function passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
