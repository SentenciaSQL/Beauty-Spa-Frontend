import {Component, computed, ElementRef, inject, OnDestroy, signal, ViewChild} from '@angular/core';
import {HomeStore} from '../home.store';
import {API_BASE_URL} from '../../../../../core/api/api.config';
import {resolveMediaUrl} from '../../../../../shared/utils/media-url';

@Component({
  selector: 'app-testimonial-section',
  imports: [],
  templateUrl: './testimonial-section.page.html',
  styleUrl: './testimonial-section.page.css',
})
export class TestimonialSectionPage implements OnDestroy {
  private home = inject(HomeStore);
  private apiBaseUrl = inject(API_BASE_URL);

  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  testimonials = computed(() => this.home.testimonials());
  currentTestimonial = signal(0);

  private autoPlayInterval: any;
  private readonly AUTO_PLAY_DELAY = 60000;

  constructor() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  imgUrl(path: string | null | undefined): string {
    return resolveMediaUrl(this.apiBaseUrl, path) ?? '';
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  goToTestimonial(index: number) {
    this.currentTestimonial.set(index);
    this.scrollToIndex(index);
    this.pauseAutoPlay();
  }

  nextTestimonial() {
    const total = this.testimonials().length;
    const next = (this.currentTestimonial() + 1) % total;
    this.goToTestimonial(next);
  }

  previousTestimonial() {
    const total = this.testimonials().length;
    const prev = (this.currentTestimonial() - 1 + total) % total;
    this.goToTestimonial(prev);
  }

  private scrollToIndex(index: number) {
    const container = this.carouselContainer?.nativeElement;
    if (!container) return;

    const children = container.children;
    if (index >= children.length) return;

    const targetElement = children[index] as HTMLElement;

    // Calcular la posición de scroll
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const scrollLeft = container.scrollLeft + (targetRect.left - containerRect.left);

    // Scroll suave
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }

  private startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextTestimonial();
    }, this.AUTO_PLAY_DELAY);
  }

  private stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private pauseAutoPlay() {
    this.stopAutoPlay();
    setTimeout(() => {
      this.startAutoPlay();
    }, 10000);
  }
}
