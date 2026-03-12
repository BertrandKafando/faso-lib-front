import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Public
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'activate-account',
    loadComponent: () => import('./pages/auth/account-activation/account-activation.component').then(m => m.AccountActivationComponent)
  },

  // Authenticated
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },

  // Admin
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'disciplines',
        loadComponent: () => import('./pages/admin/disciplines/disciplines.component').then(m => m.DisciplinesComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/admin/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'document-types',
        loadComponent: () => import('./pages/admin/document-types/document-types.component').then(m => m.DocumentTypesComponent)
      },
      {
        path: 'licenses',
        loadComponent: () => import('./pages/admin/licenses/licenses.component').then(m => m.LicensesComponent)
      }
    ]
  },

  // 404
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
