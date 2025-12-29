import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AuthApi} from '../../../../core/api/auth.api';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.css',
})
export class ForgotPasswordPage {
  private fb = inject(FormBuilder);
  private api = inject(AuthApi);

  loading = signal(false);
  success = signal(false);
  errorMsg = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.errorMsg.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.api.forgotPassword({ email: this.form.getRawValue().email })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.success.set(true),
        error: (err: unknown) => this.errorMsg.set(this.mapError(err)),
      });
  }

  private mapError(err: any): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) return 'Cannot connect to server. Is the API running?';
      // Por seguridad, no conviene revelar si el email existe o no. Mantén genérico.
      return 'If the email exists, we sent a reset link. Check your inbox.';
    }
    return 'Something went wrong.';
  }
}
