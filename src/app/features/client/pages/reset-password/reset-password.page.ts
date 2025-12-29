import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {AuthApi} from '../../../../core/api/auth.api';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.css',
})
export class ResetPasswordPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private api = inject(AuthApi);

  token = signal<string | null>(null);
  loading = signal(false);
  success = signal(false);
  errorMsg = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    new_password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]],
  });

  constructor() {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.token.set(token);
  }

  passwordMismatch(): boolean {
    const v = this.form.getRawValue();
    return v.new_password !== v.confirm;
  }

  onSubmit() {
    this.errorMsg.set(null);

    const token = this.token();
    if (!token) return;

    if (this.form.invalid || this.passwordMismatch()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.api.resetPassword({
      token,
      new_password: this.form.getRawValue().new_password,
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.success.set(true),
        error: (err: unknown) => this.errorMsg.set(this.mapError(err)),
      });
  }

  private mapError(err: any): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) return 'Cannot connect to server. Is the API running?';
      if (err.status === 400 || err.status === 401) return 'Invalid or expired token. Please request a new link.';
      const detail = err.error?.detail;
      if (typeof detail === 'string') return detail;
      return 'Reset failed.';
    }
    return 'Reset failed.';
  }
}
