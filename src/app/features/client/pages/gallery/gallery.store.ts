import {computed, inject, Injectable, signal} from '@angular/core';
import {PublicApi} from '../../../../core/api/public.api';
import {GalleryItem} from '../../../../core/interfaces/gallery';

@Injectable({
  providedIn: 'root',
})
export class GalleryStore {
  private api = inject(PublicApi);
  private _data = signal<GalleryItem[] | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  data = computed(() => this._data());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  gallery = computed(() => (this._data() ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );

  load(force = false) {
    if (!force && this._data()) return;

    this._loading.set(true);
    this._error.set(null);

    this.api.gallery().subscribe({
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
