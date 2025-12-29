import {Component, effect, inject, signal, ViewChild} from '@angular/core';
import {GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {SettingsStore} from '../../../../../core/services/settings.store';
import {formatRdMask} from '../../../../../shared/utils/phone-rd';

@Component({
  selector: 'app-location-section',
  imports: [GoogleMapsModule],
  templateUrl: './location-section.page.html',
  styleUrl: './location-section.page.css',
})
export class LocationSectionPage {
  settings = inject(SettingsStore);
  formattedNumber = signal<string>('');

  zoom = 17;

  center: google.maps.LatLngLiteral = { lat: 18.4861, lng: -69.9312 };

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor() {
    effect(() => {
      const lat = this.settings.latitude();
      const lng = this.settings.longitude();
      if (lat && lng) {
        this.center = { lat: lat, lng: lng };
        console.log('Map center set to:', this.center.lng);
      }

      this.formattedNumber = signal(formatRdMask(this.settings.contactPhone() ?? ''));
    });
  }

  openInfo(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  goToBooking() {

  }
}
