import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Home, Search, AlertCircle } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-6 text-foreground">
      <div class="max-w-2xl w-full text-center space-y-10">
        <!-- Visual Element -->
        <div class="relative inline-block">
          <div class="text-[12rem] md:text-[18rem] font-serif font-black text-primary/5 select-none leading-none">
            404
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="bg-card p-6 rounded-3xl shadow-2xl border border-border rotate-3 hover:rotate-0 transition-transform duration-500">
               <lucide-icon [img]="AlertCircleIcon" class="w-20 h-20 text-accent"></lucide-icon>
            </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="space-y-4">
          <h1 class="text-4xl md:text-5xl font-serif font-bold text-foreground">Page Introuvable</h1>
          <p class="text-lg text-muted-foreground max-w-md mx-auto">
            Désolé, la page que vous recherchez semble avoir été déplacée ou n'existe plus dans notre bibliothèque.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a routerLink="/" class="w-full sm:w-auto">
            <button class="w-full px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
              <lucide-icon [img]="HomeIcon" class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"></lucide-icon>
              Retour à l'accueil
            </button>
          </a>
          <a routerLink="/documents" class="w-full sm:w-auto">
            <button class="w-full px-8 py-4 bg-card border border-border text-foreground rounded-2xl font-bold hover:bg-muted transition-all flex items-center justify-center gap-2">
              <lucide-icon [img]="SearchIcon" class="w-5 h-5"></lucide-icon>
              Explorer les documents
            </button>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotFoundComponent {
  readonly HomeIcon = Home;
  readonly SearchIcon = Search;
  readonly AlertCircleIcon = AlertCircle;
}
