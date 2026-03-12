import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { 
  LucideAngularModule, 
  LayoutDashboard, 
  Files, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  Sun,
  Moon,
  User,
  ClipboardPenLine,
  FileType,
  Scale
} from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    LucideAngularModule,
    TranslateModule,
    ThemeToggleComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  translate = inject(TranslateService);
  isSidebarOpen = true;

  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly UserIcon = User;

  isProfileOpen = false;

  readonly LogOutIcon = LogOut;
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly BellIcon = Bell;
  readonly SearchIcon = Search;

  adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, labelKey: "ADMIN.DASHBOARD", exact: true },
    { href: "/admin/documents", label: "Documents", icon: Files, labelKey: "ADMIN.DOCUMENTS" },
    { href: "/admin/users", label: "Utilisateurs", icon: Users, labelKey: "ADMIN.USERS" },
    { href: "/admin/disciplines", label: "Disciplines", icon: ClipboardPenLine, labelKey: "ADMIN.DISCIPLINES" },
    { href: "/admin/document-types", label: "Types de docs", icon: FileType, labelKey: "ADMIN.DOCUMENT_TYPES" },
    { href: "/admin/licenses", label: "Licences", icon: Scale, labelKey: "ADMIN.LICENSES" },
  ];

  systemNavItems = [
    { href: "/admin/settings", label: "Paramètres", icon: Settings, labelKey: "ADMIN.SETTINGS" },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  logout() {
    this.authService.logout();
  }
}
