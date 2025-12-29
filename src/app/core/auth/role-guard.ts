import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStore} from './auth-store';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  const allowed: string[] = route.data['roles'] ?? [];
  const role = auth.user()?.role;

  if (role && allowed.includes(role)) return true;

  router.navigateByUrl('/');
  return false;
};
