import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component')
            .then(c => c.LoginComponent)
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./signup/signup.component')
            .then(c => c.SignupComponent)
      },
    ]
  }
];