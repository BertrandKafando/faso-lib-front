import { Component, inject, computed } from '@angular/core';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;

  isDark = computed(() => this.themeService.isDarkMode());

  toggle() {
    this.themeService.toggleTheme();
  }
}
