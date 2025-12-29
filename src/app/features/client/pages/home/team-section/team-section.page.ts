import {Component, computed, effect, inject} from '@angular/core';
import {HomeStore} from '../home.store';
import {resolveMediaUrl} from '../../../../../shared/utils/media-url';
import {API_BASE_URL} from '../../../../../core/api/api.config';

@Component({
  selector: 'app-team-section',
  imports: [],
  templateUrl: './team-section.page.html',
  styleUrl: './team-section.page.css',
})
export class TeamSectionPage {
  private home = inject(HomeStore);
  private apiBaseUrl = inject(API_BASE_URL);
  employees = computed(() => this.home.employees());

  constructor() {
    this.home.load();

    effect(() => {
      console.log('Employees updated:', this.employees());
    });
  }

  imgUrl(path: string | null | undefined): string {
    return resolveMediaUrl(this.apiBaseUrl, path) ?? '';
  }
}
