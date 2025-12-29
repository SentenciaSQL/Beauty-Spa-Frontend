import {Component, computed, inject} from '@angular/core';
import {AuthStore} from '../../auth/auth-store';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../../shared/header/header.component';
import {FooterComponent} from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-client-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
})
export class ClientLayoutComponent {
  private auth = inject(AuthStore);
}
