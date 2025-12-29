import {Component, inject} from '@angular/core';
import {AuthStore} from '../../../../core/auth/auth-store';

@Component({
  selector: 'app-appointments',
  imports: [],
  templateUrl: './appointments.page.html',
  styleUrl: './appointments.page.css',
})
export class AppointmentsPage {
  auth = inject(AuthStore);
}
