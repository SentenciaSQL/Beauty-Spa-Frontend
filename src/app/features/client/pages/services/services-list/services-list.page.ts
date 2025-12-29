import {Component, computed, effect, inject} from '@angular/core';
import {API_BASE_URL} from '../../../../../core/api/api.config';
import {ServicesStore} from '../services.store';
import {resolveMediaUrl} from '../../../../../shared/utils/media-url';

@Component({
  selector: 'app-services-list',
  imports: [],
  templateUrl: './services-list.page.html',
  styleUrl: './services-list.page.css',
})
export class ServicesListPage {
  private servicesStore = inject(ServicesStore);
  private apiBaseUrl = inject(API_BASE_URL);
  services = computed(() => this.servicesStore.services());

  constructor() {
    this.servicesStore.load();

    effect(() => {
      console.log('Services loaded in ServicesListPage:', this.services());
    });
  }

  imgUrl(path: string | null | undefined): string {
    return resolveMediaUrl(this.apiBaseUrl, path) ?? '';
  }
}
