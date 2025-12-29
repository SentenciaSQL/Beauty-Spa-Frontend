import {Component, effect, inject, signal} from '@angular/core';
import {SettingsStore} from '../../core/services/settings.store';
import {RouterLink} from '@angular/router';
import {formatRdMask} from '../utils/phone-rd';

interface SocialLink {
  id?: number;
  type: string;
  url: string;
  iconClass: string;
  is_active: boolean;
  sort_order: number;
}

const iconMap: Record<string, string> = {
  INSTAGRAM: 'fa-brands fa-instagram',
  FACEBOOK: 'fa-brands fa-facebook',
  X: 'fa-brands fa-x-twitter',
  TIKTOK: 'fa-brands fa-tiktok',
  YOUTUBE: 'fa-brands fa-youtube',
  WHATSAPP: 'fa-brands fa-whatsapp',
  WEBSITE: 'fa-solid fa-globe',
};

@Component({
  selector: 'app-footer',
  imports: [
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  settings = inject(SettingsStore);
  currentYear = new Date().getFullYear();
  socialLinks = signal<SocialLink[]>([]);
  formattedNumber = signal<string>('');

  constructor() {

    effect(() => {
      const socials = this.settings.socials();
      if (!socials || socials.length === 0) {
        this.socialLinks.set([]);
        return;
      }

      this.formattedNumber = signal(formatRdMask(this.settings.contactPhone() ?? ''));

      const transformed = socials
        .filter(s => s.is_active)
        .map(social => ({
          id: social.id,
          type: social.type,
          url: social.url,
          iconClass: iconMap[social.type] ?? 'fa-solid fa-share-nodes',
          is_active: social.is_active,
          sort_order: social.sort_order,
        }))
        .sort((a, b) => a.sort_order - b.sort_order);

      this.socialLinks.set(transformed);
    });
  }
}
