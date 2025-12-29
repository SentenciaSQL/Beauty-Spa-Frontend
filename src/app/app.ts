import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SettingsStore} from './core/services/settings.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'beauty-spa-frontend';

  private settings = inject(SettingsStore);

  ngOnInit(): void {
    this.settings.load();
    // console.log(this.settings);
  }
}
