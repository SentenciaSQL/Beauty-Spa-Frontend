import {Component, computed, effect, inject} from '@angular/core';
import {HomeStore} from '../home.store';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-price-section',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './price-section.page.html',
  styleUrl: './price-section.page.css',
})
export class PriceSectionPage {
  private home = inject(HomeStore);
  services = computed(() => this.home.all_services());

  constructor() {
    this.home.load();

    effect(() => {
      console.log('All Services updated:', this.services());
    });
  }
}
