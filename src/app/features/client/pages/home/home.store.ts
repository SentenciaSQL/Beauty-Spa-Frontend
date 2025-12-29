import {computed, inject, Injectable, signal} from '@angular/core';
import {PublicApi, PublicHomeResponse} from '../../../../core/api/public.api';

@Injectable({
  providedIn: 'root',
})
export class HomeStore {
  private api = inject(PublicApi);

  private _data = signal<PublicHomeResponse | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  data = computed(() => this._data());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  settings = computed(() => this._data()?.settings ?? null);

  slides = computed(() => (this._data()?.slides ?? [])
    .filter(s => s.is_active)
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );

  services = computed(() => (this._data()?.services ?? [])
    .filter(s => s.is_active)
    .slice(0,4)
    .sort((a, b) => a.sort_order - b.sort_order)
  );

  all_services = computed(() => (this._data()?.services ?? [])
    .filter(s => s.is_active)
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
  );

  employees = computed(() => (this._data()?.employees ?? [])
    .filter(e => e.is_active)
    .slice(0,4)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );

  gallery = computed(() => (this._data()?.gallery ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );

  testimonials = computed(() => (this._data()?.testimonials ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );

  siteSocials = computed(() => (this._data()?.site_socials ?? []));

  load(force = false) {
    if (!force && this._data()) return;

    this._loading.set(true);
    this._error.set(null);

    this.api.home().subscribe({
      next: (res) => {
        // no mutamos res, guardamos tal cual
        this._data.set(res);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load homepage data.');
        this._loading.set(false);
      },
    });
  }
}
