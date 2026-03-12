import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';
import { 
  LucideAngularModule, 
  Library, 
  BookOpen, 
  Upload, 
  ClipboardPenLine,
  User, 
  LogOut, 
  Menu, 
  GraduationCap,
  LayoutDashboard,
  Sun,
  Moon,
  Languages
} from 'lucide-angular';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LucideAngularModule,
    TranslateModule,
    ButtonModule,
    ThemeToggleComponent
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  translate = inject(TranslateService);
  router = inject(Router);
  isOpen = false;
  isProfileOpen = false; // Using boolean to match working admin layout

  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Languages = Languages;

  readonly Library = Library;
  readonly GraduationCap = GraduationCap;
  readonly UserIcon = User;
  readonly LogOutIcon = LogOut;
  readonly Menu = Menu;
  readonly LayoutDashboard = LayoutDashboard;

  navItems = [
    { href: "/", label: "Accueil", icon: Library, labelKey: "NAV.HOME" },
    { href: "/documents", label: "Bibliothèque", icon: BookOpen, labelKey: "NAV.LIBRARY" },
    { href: "/deposit", label: "Dépôt", icon: Upload, labelKey: "NAV.DEPOSIT" },
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.isProfileOpen = false; 
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout().subscribe();
  }

  navigateToProfile() {
    this.isProfileOpen = false;
    this.router.navigate(['/profile']);
  }
}
