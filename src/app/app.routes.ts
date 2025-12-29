import { Routes } from '@angular/router';
import {ClientLayoutComponent} from './core/layout/client-layout/client-layout.component';
import {authGuard} from './core/auth/auth-guard';
import {roleGuard} from './core/auth/role-guard';
import {AdminLayoutComponent} from './core/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./features/client/pages/home/home.page').then(m => m.HomePage) },
      { path: 'register', loadComponent: () => import('./features/client/pages/register/register.page').then(m => m.RegisterPage) },
      { path: 'login', loadComponent: () => import('./features/client/pages/login/login.page').then(m => m.LoginPage) },
      { path: 'forgot-password', loadComponent: () => import('./features/client/pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage) },
      { path: 'reset-password', loadComponent: () => import('./features/client/pages/reset-password/reset-password.page').then(m => m.ResetPasswordPage) },
      { path: 'services', loadComponent: () => import('./features/client/pages/services/services.page').then(m => m.ServicesPage) },

      {
        path: 'appointments',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['CUSTOMER'] },
        loadComponent: () => import('./features/client/pages/appointments/appointments.page').then(m => m.AppointmentsPage)
      },
      {
        path: 'book',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['CUSTOMER'] },
        loadComponent: () => import('./features/client/pages/book-appointment/book-appointment.page').then(m => m.BookAppointmentPage)
      },
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN', 'RECEPTIONIST'] },
    children: [
      { path: '', loadComponent: () => import('./features/admin/pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'appointments', loadComponent: () => import('./features/admin/pages/appointments/appointments.page').then(m => m.AppointmentsPage) },
      { path: 'users', loadComponent: () => import('./features/admin/pages/users/users.page').then(m => m.UsersPage) },
    ]
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
