import {Component, computed, inject} from '@angular/core';
import {AuthStore} from '../../auth/auth-store';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  private auth = inject(AuthStore);
  role = computed(() => this.auth.user()?.role ?? '—');
  logout() { this.auth.logout(); }
}
