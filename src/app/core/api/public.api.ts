import {inject, Injectable} from '@angular/core';
import { API_BASE_URL } from './api.config';
import {SiteSettings} from '../interfaces/site-settings';
import {Slide} from '../interfaces/slide';
import {ServiceItem} from '../interfaces/service';
import {GalleryItem} from '../interfaces/gallery';
import {Testimonial} from '../interfaces/testimonial';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PublicHomeResponse {
  settings: SiteSettings;
  slides: Slide[];
  services: ServiceItem[];
  employees: Employee[];
  products: unknown[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  site_socials: SiteSocial[];
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class PublicApi {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  home(): Observable<PublicHomeResponse> {
    return this.http.get<PublicHomeResponse>(`${this.baseUrl}/public/home`);
  }

  services(): Observable<PaginatedResponse<ServiceItem>> {
    return this.http.get<PaginatedResponse<ServiceItem>>(`${this.baseUrl}/public/services`);
  }
}
