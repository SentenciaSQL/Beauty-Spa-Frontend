import {Component, computed, effect, inject, signal} from '@angular/core';
import {GalleryStore} from './gallery.store';
import {API_BASE_URL} from '../../../../core/api/api.config';
import {resolveMediaUrl} from '../../../../shared/utils/media-url';
import {GalleryItem} from '../../../../core/interfaces/gallery';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.page.html',
  styleUrl: './gallery.page.css',
})
export class GalleryPage {
  private galleryStore = inject(GalleryStore);
  private apiBaseUrl = inject(API_BASE_URL);
  galleryItems = computed(() => this.galleryStore.gallery());
  selectedImage = signal<GalleryItem | null>(null);

  constructor() {
    this.galleryStore.load();

    effect(() => {
      console.log('Gallery items loaded in GalleryPage:', this.galleryItems());
    });
  }

  imgUrl(path: string | null | undefined): string {
    return resolveMediaUrl(this.apiBaseUrl, path) ?? '';
  }

  openModal(image: GalleryItem) {
    this.selectedImage.set(image);
    const modal = document.getElementById('gallery_modal') as HTMLDialogElement;
    modal?.showModal();
  }
}
