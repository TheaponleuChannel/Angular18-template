import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  CREDENTIALS_KEY = 'credentials';

  saveUsername(username: string) {
    const credentials = { username: username, token: this.#generateToken(username) };
    localStorage.setItem(this.CREDENTIALS_KEY, JSON.stringify(credentials));
  }

  getUsername(): string {
    return localStorage.getItem(this.CREDENTIALS_KEY) || '';
  }

  removeUsername() {
    localStorage.removeItem(this.CREDENTIALS_KEY);
  }

  #generateToken(user: string): string {
    return btoa(user + ':' + this.#randomString());
  }

  #randomString() {
    return Math.random().toString(36).substring(2);
  }

  isLoggedIn(): boolean {
    const credentials = localStorage.getItem(this.CREDENTIALS_KEY);
    return credentials ? true : false;
  }

}

export interface User {
  username: string;
  token: string;
  password: string;
}