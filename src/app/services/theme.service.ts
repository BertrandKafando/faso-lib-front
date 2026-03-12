import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'fasolib_theme';
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Synchronize HTML class with the signal state
    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(this.STORAGE_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(this.STORAGE_KEY, 'light');
      }
    });
  }

  private getInitialTheme(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return stored === 'dark';
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }
}
