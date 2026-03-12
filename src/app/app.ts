import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private translate = inject(TranslateService);
  protected readonly title = signal('client-angular');

  constructor() {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}
