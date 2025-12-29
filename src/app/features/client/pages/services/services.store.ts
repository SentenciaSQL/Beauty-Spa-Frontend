import {computed, inject, Injectable, signal} from '@angular/core';
import {PublicApi} from '../../../../core/api/public.api';
import {ServiceItem} from '../../../../core/interfaces/service';

@Injectable({
  providedIn: 'root',
})
export class ServicesStore {
  private api = inject(PublicApi);
  private _data = signal<ServiceItem[] | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  data = computed(() => this._data());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  services = computed(() => (this._data() ?? [])
    .filter(s => s.is_active)
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );

  load(force = false) {
    if (!force && this._data() !== null) return;

    this._loading.set(true);
    this._error.set(null);

    this.api.services().subscribe({
      next: (res) => {
        // no mutamos res, guardamos tal cual
        this._data.set(res.items);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Services load failed:', err);
        this._error.set('Failed to load services data.');
        this._loading.set(false);
      },
    });
  }
}
