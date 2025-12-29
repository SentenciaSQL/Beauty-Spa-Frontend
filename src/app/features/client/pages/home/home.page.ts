import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SliderComponent} from './slider/slider.component';
import {ServicesSectionComponent} from './services-section/services-section.component';
import {HomeStore} from './home.store';
import {LocationSectionPage} from './location-section/location-section.page';
import {TestimonialSectionPage} from './testimonial-section/testimonial-section.page';
import {PriceSectionPage} from './price-section/price-section.page';
import {TeamSectionPage} from './team-section/team-section.page';

@Component({
  selector: 'app-home',
  imports: [
    SliderComponent,
    ServicesSectionComponent,
    LocationSectionPage,
    TestimonialSectionPage,
    PriceSectionPage,
    TeamSectionPage
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  private home = inject(HomeStore);

  constructor() {
    this.home.load();
  }
}
