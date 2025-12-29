import {Component, computed, effect, ElementRef, inject, signal, ViewChild, OnDestroy} from '@angular/core';
import {HomeStore} from '../home.store';
import {resolveMediaUrl} from '../../../../../shared/utils/media-url';
import {API_BASE_URL} from '../../../../../core/api/api.config';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnDestroy {
  private home = inject(HomeStore);
  private apiBaseUrl = inject(API_BASE_URL);
  slides = computed(() => this.home.slides());
  currentSlide = signal(0);

  private autoPlayInterval: any;
  private readonly AUTO_PLAY_DELAY = 6000; // 6 segundos para disfrutar la animación
  private pauseTimeout: any;

  @ViewChild('carousel', { static: true }) carouselRef!: ElementRef<HTMLElement>;

  constructor() {
    this.home.load();

    effect(() => {
      if (this.slides().length > 0 && !this.autoPlayInterval) {
        this.startAutoPlay();
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
    }
  }

  slideId(index: number): string {
    return `slide${index + 1}`;
  }

  prevIndex(i: number, total: number): number {
    return (i - 1 + total) % total;
  }

  nextIndex(i: number, total: number): number {
    return (i + 1) % total;
  }

  imgUrl(path: string | null | undefined): string {
    return resolveMediaUrl(this.apiBaseUrl, path) ?? '';
  }

  goTo(index: number) {
    this.currentSlide.set(index);
  }

  private startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      const total = this.slides().length;
      if (total > 0) {
        const nextIndex = this.nextIndex(this.currentSlide(), total);
        this.goTo(nextIndex);
      }
    }, this.AUTO_PLAY_DELAY);
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  pauseAutoPlay() {
    this.stopAutoPlay();

    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
    }

    this.pauseTimeout = setTimeout(() => {
      this.startAutoPlay();
    }, 10000);
  }

  navigatePrev() {
    const total = this.slides().length;
    const prevIdx = this.prevIndex(this.currentSlide(), total);
    this.goTo(prevIdx);
    this.pauseAutoPlay();
  }

  navigateNext() {
    const total = this.slides().length;
    const nextIdx = this.nextIndex(this.currentSlide(), total);
    this.goTo(nextIdx);
    this.pauseAutoPlay();
  }

  navigateToSlide(index: number) {
    this.goTo(index);
    this.pauseAutoPlay();
  }
}
