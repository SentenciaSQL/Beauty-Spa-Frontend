import {computed, effect, inject, Injectable} from '@angular/core';
import {HomeStore} from '../../features/client/pages/home/home.store';
import {API_BASE_URL} from '../api/api.config';
import {resolveMediaUrl} from '../../shared/utils/media-url';

@Injectable({
  providedIn: 'root',
})
export class SettingsStore {
  private home = inject(HomeStore);
  private apiBaseUrl = inject(API_BASE_URL);

  settings = computed(() => this.home.settings());
  socials = computed(() => this.home.siteSocials());
  loading = computed(() => this.home.loading());
  error = computed(() => this.home.error());

  siteSocials: SiteSocial[] = [];

  appName = computed(() => this.settings()?.app_name ?? 'Beauty Spa');

  logoUrl = computed(() => {
    const logoPath = this.settings()?.logo_main_url;
    return resolveMediaUrl(this.apiBaseUrl, logoPath);
  });

  about_text = computed(() => this.settings()?.about_text ?? null);
  address_text = computed(() => this.settings()?.address_text ?? null);
  contactEmail = computed(() => this.settings()?.contact_email ?? null);
  contactPhone = computed(() => this.settings()?.contact_phone ?? null);
  longitude = computed(() => this.settings()?.longitude ?? null);
  latitude = computed(() => this.settings()?.latitude ?? null);

  constructor() {
    effect(() => {
      const socialData = this.socials();
      if (socialData && socialData.length > 0) {
        this.siteSocials = socialData;
        // console.log('Socials loaded:', this.siteSocials);
      }
    });
  }

  load() {
    this.home.load();
    console.log('Settings loaded:');
  }
}
