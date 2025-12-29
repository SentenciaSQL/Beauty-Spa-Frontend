import {Injectable, signal, computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_e164: string; // +18099949181
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user = signal<User | null>(this.readUser());
  private router = inject(Router);

  token = computed(() => this._token());
  user = computed(() => this._user());
  isLoggedIn = computed(() => !!this._token());

  setSession(res: LoginResponse) {
    this._token.set(res.access_token);
    this._user.set(res.user);
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/'])

  }

  private readUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}
