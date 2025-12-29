import { Component } from '@angular/core';
import {ServicesBannerPage} from './services-banner/services-banner.page';
import {ServicesListPage} from './services-list/services-list.page';
import {SpecialPackagesPage} from './special-packages/special-packages.page';

@Component({
  selector: 'app-services',
  imports: [
    ServicesBannerPage,
    ServicesListPage,
    SpecialPackagesPage
  ],
  templateUrl: './services.page.html',
  styleUrl: './services.page.css',
})
export class ServicesPage {

}
