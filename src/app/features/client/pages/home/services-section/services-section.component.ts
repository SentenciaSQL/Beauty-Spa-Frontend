import {Component, computed, effect, inject} from '@angular/core';
import {HomeStore} from '../home.store';
import {API_BASE_URL} from '../../../../../core/api/api.config';
import {resolveMediaUrl} from '../../../../../shared/utils/media-url';

@Component({
  selector: 'app-services-section',
  imports: [],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
})
export class ServicesSectionComponent {
  private home = inject(HomeStore);
  private apiBaseUrl = inject(API_BASE_URL);
  services = computed(() => this.home.services());

  constructor() {
    this.home.load();
  }

  imgUrl(path: string | null | undefined): string {
    return resolveMediaUrl(this.apiBaseUrl, path) ?? '';
  }

}
