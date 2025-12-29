import {Component, computed, effect, inject} from '@angular/core';
import {AuthStore} from '../../core/auth/auth-store';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {HomeStore} from '../../features/client/pages/home/home.store';
import {resolveMediaUrl} from '../utils/media-url';
import {API_BASE_URL} from '../../core/api/api.config';
import {SettingsStore} from '../../core/services/settings.store';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private auth = inject(AuthStore);
  private router = inject(Router);
  isLoggedIn = computed(() => this.auth.isLoggedIn());
  logout() { this.auth.logout(); }

  settings = inject(SettingsStore);


  makeAnAppointment() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/book']);
    }
    console.log(this.isLoggedIn())
  }
}
