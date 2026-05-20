import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatButtonModule }    from '@angular/material/button';
import { MatIconModule }      from '@angular/material/icon';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule, CommonModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  #router = inject(Router)
  #fb = inject(FormBuilder)
  #authService = inject(AuthService);

  loginForm: FormGroup;
  showPassword = true;
  isLoading    = false;
  loginSuccess = false;
  loginError   = false;
  shakeForm    = false;
 
  constructor() {
    this.loginForm = this.#fb.group({
      username:   ['admin', [Validators.required, Validators.minLength(3)]],
      password:   ['password', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }
 
  get f() {
    return this.loginForm.controls;
  }
 
  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.triggerShake();
      return;
    }
    this.isLoading  = true;
    this.loginError = false;
    this.loginSuccess = false;
    const { username, password } = this.loginForm.value;
 
    this.#authService.login(username, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.loginSuccess = true;
        this.#router.navigateByUrl(this.#authService.return);
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = true;
        this.triggerShake();
        setTimeout(() => (this.loginError = false), 4000);
      }
    })
  }
 
  private triggerShake(): void {
    this.shakeForm = true;
    setTimeout(() => (this.shakeForm = false), 550);
  }
}
