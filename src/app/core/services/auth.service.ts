import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { CredentialService } from './credential.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #credential = inject(CredentialService)
  #route = inject(ActivatedRoute)
  #router = inject(Router)
  return: string = '';

  constructor() { 
    this.#route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  login(username: string, password: string): Observable<Credential> {
    username = username.trim();
    password = password.trim();

    // Invalid credentials
    if (username !== 'admin' || password !== 'password') {
      return throwError(() => ({
        message: 'Invalid credentials'
      }));
    }

    // Success
    return of({username})
      .pipe(
        delay(1000),
        map((res: any) => {
          this.#credential.saveUsername(username);
          return res
        }),
        catchError(err => of(err))
      );
  }

  logout() {
    this.#credential.removeUsername();
    this.#router.navigateByUrl("session/login");
  }
  
}
export interface Credential {
  username?: string;
  token?: string;
  password?: string;
  message?: string;
}