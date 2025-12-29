import {Component, inject, signal} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthApi} from '../../../../core/api/auth.api';
import {AuthStore} from '../../../../core/auth/auth-store';
import {formatRdMask, toE164Rd} from '../../../../shared/utils/phone-rd';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

function rdPhoneMaskValidator(ctrl: AbstractControl): ValidationErrors | null {
  const e164 = toE164Rd(String(ctrl.value ?? ''));
  return e164 ? null : { rdPhone: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private api = inject(AuthApi);
  private auth = inject(AuthStore);
  private router = inject(Router);

  loading = signal(false);
  errorMsg = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],

    // UI mask field
    phone: ['', [Validators.required, rdPhoneMaskValidator]],
  });

  onPhoneInput(ev: Event) {
    const el = ev.target as HTMLInputElement;
    const formatted = formatRdMask(el.value);
    // evita loops raros: setValue con emitEvent false
    this.form.controls.phone.setValue(formatted, { emitEvent: false });
  }

  onSubmit() {
    this.errorMsg.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const phoneE164 = toE164Rd(v.phone);
    if (!phoneE164) {
      this.form.controls.phone.setErrors({ rdPhone: true });
      return;
    }

    this.loading.set(true);

    this.api.register({
      email: v.email,
      first_name: v.first_name,
      last_name: v.last_name,
      password: v.password,
      phone_e164: phoneE164, // backend/db
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          // tu backend devuelve token + user => sesión inmediata
          this.auth.setSession(res);
          this.router.navigateByUrl('/appointments');
        },
        error: (err: unknown) => this.errorMsg.set(this.mapError(err)),
      });
  }

  private mapError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) return 'Cannot connect to server. Is the API running?';
      const detail = err.error?.detail;
      if (typeof detail === 'string') return detail;
      return 'Registration failed.';
    }
    return 'Registration failed.';
  }
}
