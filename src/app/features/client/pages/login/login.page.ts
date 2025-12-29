import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthApi} from '../../../../core/api/auth.api';
import {AuthStore} from '../../../../core/auth/auth-store';
import {Router, RouterLink} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private api = inject(AuthApi);
  private auth = inject(AuthStore);
  private router = inject(Router);

  loading = signal(false);
  errorMsg = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.errorMsg.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    console.log('Submitting login for', email);
    console.log('Password:', password);
    this.loading.set(true);

    this.api.login(email, password)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.auth.setSession(res);

          // App1: siempre manda al cliente a su área
          // (aunque por error loguee un ADMIN, lo mandamos a home o appointments)
          this.router.navigateByUrl('/appointments');
        },
        error: (err: unknown) => this.errorMsg.set(this.mapError(err)),
      });
  }

  private mapError(err: any): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) return 'Cannot connect to server. Is the API running?';
      if (err.status === 401) return 'Invalid email or password.';
      const detail = err.error?.detail;
      if (typeof detail === 'string') return detail;
      return 'Login failed.';
    }
    return 'Login failed.';
  }
}
