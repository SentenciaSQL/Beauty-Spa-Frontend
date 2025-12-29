import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_BASE_URL} from './api.config';
import {Observable} from 'rxjs';
import {LoginResponse, RegisterRequest} from '../auth/auth-store';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  ok: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  ok: boolean; // si tu backend devuelve algo distinto, me dices y lo ajusto
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/login`;

    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<LoginResponse>(url, body.toString(), { headers });

  }

  register(payload: RegisterRequest): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<LoginResponse>(url, payload);
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    const url = `${this.baseUrl}/auth/forgot-password`;
    return this.http.post<ForgotPasswordResponse>(url, payload);
  }

  resetPassword(payload: ResetPasswordRequest): Observable<ForgotPasswordResponse> {
    const url = `${this.baseUrl}/auth/reset-password`;
    return this.http.post<ForgotPasswordResponse>(url, payload);
  }
}
